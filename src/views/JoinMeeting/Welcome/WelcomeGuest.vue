<template>
    <div class="d-flex h-100 justify-content-center">

        <div v-if="isFetchingData">
            <!--
            <span class="fa fa-cog fa-spin mr-1"></span> Loading...
            -->
        </div>
        <div v-else class="w-100">
            <div class="row mx-0">
                <div class="col-md-6">
                    <div class="row">
                        <div class="col-xl-9 mx-auto">
                            <form class="form-horizontal mt-5" @submit="joinMeeting">
                                <p class="mb-2"><span class="font-weight-bold">Meeting ID:</span> {{ webrtcAlias }}</p>
                                <h5 class="mb-2">
                                    Welcome to {{ host.name }} {{ host.last_name }}'
                                    <span v-if="(brand.call_type === 'meetings') || !brand.call_type">meeting</span>
                                    <span v-if="brand.call_type === 'conferences'">conference</span>
                                    <span v-if="brand.call_type === 'other'">{{ brand.custom_call_type }}</span>
                                </h5>
                                <div class="form-group">
                                    <label>Your name</label>
                                    <input 
                                        type="text" 
                                        class="form-control" 
                                        v-model="displayName" 
                                        ref="displayName" 
                                        required />
                                </div>
                                <div v-show="error" class="alert alert-warning" role="alert">
                                    {{ error }}
                                </div>
                                <div class="text-center my-2">
                                    <button @click="joinWithVideo" class="btn btn-primary w-100" type="submit">
                                        <img src="@/assets/img/icons/ic_video_white.svg" class="ml-2"/>
                                        Join with video
                                    </button>
                                </div>
                                <div class="text-center my-2">
                                    <button @click="joinWithAudio" class="btn btn-secondary w-100" type="submit">
                                        <img src="@/assets/img/icons/ic_support_white.svg" class="ml-2"/>
                                        Join with audio
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div class="col-xl-9 mx-auto my-4">
                            <hr/>
                        </div>
                        <div class="col-xl-9 mx-auto">
                            <label class="font-weight-bold">Want to join the conference with a platform you already have?</label>
                            <p>Pick from the options we support below</p>
                            <div>
                                <router-link
                                    v-if="meetingRoom.has_gateway_license"
                                    :to="{name: 'video-device-instructions', params: {
                                    webrtcAlias: webrtcAlias,
                                    preloadedMeetingRoom: meetingRoom,
                                }}">
                                    <button class="btn btn-primary btn-sm" type="button">Video device</button>
                                </router-link>
                                <button v-else
                                    v-tooltip="{content: 'This meeting room does not support video devices'}"
                                    class="btn btn-gray btn-sm disabled"
                                    type="button">
                                    Video device
                                </button>   
                                <router-link :to="{name: 'phone-instructions', params: {
                                    webrtcAlias: webrtcAlias,
                                    preloadedMeetingRoom: meetingRoom,
                                }}">
                                    <button class="btn btn-primary btn-sm ml-2" type="submit">Phone</button>
                                </router-link>

                                <router-link
                                    v-if="meetingRoom.skype"
                                    :to="{name: 'skype-instructions', params: {
                                    webrtcAlias: webrtcAlias,
                                    preloadedMeetingRoom: meetingRoom,
                                }}">
                                    <button class="btn btn-primary btn-sm ml-2" type="submit">Skype</button>
                                </router-link>
                                <button v-else
                                    v-tooltip="{content: 'This meeting room does not support Skype'}"
                                    class="btn btn-gray btn-sm disabled ml-2"
                                    type="button">
                                    Skype
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-6 right-side-image d-none d-md-block" :style="backImageStyle">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import axios from 'axios'

    export default {
        name: 'WelcomeGuest',
        components: {
            // SiteWrapper,
            // BrandingTable,
        },
        props: {
            preloadedMeetingRoom: Object,
            webrtcAlias: String,
            error: String,
            previousRoute: {
                type: Object,
                default: () => {
                    return {};
                }
            },
        },
        data() {
            return {
                isFetchingData: true,
                displayName: '',
                callType: 'video',
                conferencingNode: '',
                brand: {},
                host: {
                    name: '',
                    last_name: '',
                },
                meetingRoom: this.preloadedMeetingRoom ? Vue.util.extend({}, this.preloadedMeetingRoom) : null,
                backImageStyle: ''
            };
        },
        computed: {
        },
        mounted() {
            this.$emit('disable-fullscreen')
            if (this.meetingRoom) {
                this.onDataFetched(this.meetingRoom);
                return;
            }

            this.getData();
        },
        methods: {
            getData() {
                this.$store.dispatch('setLoadingStatus', 'loading')
                let url = '/join-meeting-room/' + this.webrtcAlias;

                axios({url: url, method: 'GET'})
                    .then(resp => {
                        let data = resp.data;
                        this.onDataFetched(data);
                    })
                    .catch((err) => {
                        this.onFetchingError(err);
                    });
            },
            onDataFetched(data) {
                this.meetingRoom = data;
                this.brand = data.brand;
                this.conferencingNode = data.webrtc.conferencing_node;
                this.host.name = data.host.name;
                this.host.last_name = data.host.last_name;
                this.isFetchingData = false;
                this.changeFavicon()
                if (this.brand.hero_image) {
                    this.backImageStyle = `background-image: url(${this.brand.hero_image})`
                }
                this.$store.dispatch('setLoadingStatus', 'success')
                this.$store.dispatch('setLogo', { logo:this.brand.logo, level:this.brand.level})
                this.$store.dispatch('setGuestWelcomeMessage', this.brand.guest_welcome_message)
                console.log(this.brand)
                setTimeout(() => {
                    this.$refs.displayName.focus();
                }, 200);
            },
            onFetchingError(err) {
                let statusCode = err.response.status;
                let error = statusCode === 404 ? 'Meeting not found' : ('Unexpected error, code ' + statusCode);

                this.redirectBack(error);
            },
            redirectBack(error) {
                let params = Vue.util.extend({}, this.previousRoute.params);

                if (!this.previousRoute.name) {
                    this.previousRoute.name = 'join-meeting';
                }

                this.$store.dispatch('setLoadingStatus', 'success')
                params.error = error || '';
                this.$router.push({name: this.previousRoute.name, params: params});
            },
            joinWithVideo() {
                this.callType = 'video';
            },
            joinWithAudio() {
                this.callType = 'audioonly';
            },
            joinMeeting(e) {
                e.preventDefault();

                let welcomePagePreviousRoute = Vue.util.extend({}, this.previousRoute);
                welcomePagePreviousRoute.header = 'Welcome';

                this.$router.push({
                    name: 'ongoing-meeting',
                    params: {
                        meetingRoomId: this.meetingRoom.id,
                        meetingId: this.meetingRoom.meeting_id,
                        webrtcAlias: this.webrtcAlias,
                        displayName: this.displayName,
                        callType: this.callType,
                        conferencingNode: this.conferencingNode,
                        retryConnecting: false,
                        previousRoute: {
                            name: 'welcome-guest',
                            params: {
                                webrtcAlias: this.webrtcAlias,
                                previousRoute: welcomePagePreviousRoute,
                            }
                        },
                    }
                });
            },
            changeFavicon() {
                var link = document.createElement('link'),
                    oldLink = document.getElementById('dynamic-favicon')
                link.id = 'dynamic-favicon'
                link.rel = 'shortcut icon'
                if (this.brand.favicon) {
                    link.href = this.brand.favicon
                } else {
                    link.href = ''
                }
                if (oldLink) {
                    document.head.removeChild(oldLink);
                }
                document.head.appendChild(link);
            }
        }
    }
</script>
