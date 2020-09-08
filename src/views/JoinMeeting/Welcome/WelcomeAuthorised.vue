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
                            <form @submit="joinMeeting" class="form-horizontal mt-5">
                                <p class="mb-2"><span class="font-weight-bold">Meeting ID:</span> {{ webrtcAlias }}</p>
                                <h5 class="mb-2">Welcome {{ host.name }} {{ host.last_name }}</h5>
                                <!-- <p class="mb-2">it's good to see you!</p> -->
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
                            <div class="telephone-content">
                                <label class="font-weight-bold mt-1 mb-1">Share this URL with other participants:</label>
                                <form class="form-horizontal">
                                    <div class="form-group with-right-icon" >
                                        <label class="sr-only">Meeting URL</label>
                                        <div class="form-control border-dash h-auto">
                                            <a :href="webrtcAliasDirectLink(webrtcAlias)" 
                                                target="_blank">
                                                {{ webrtcAliasDirectLink(webrtcAlias) }}
                                            </a>
                                        </div>
                                        <a href="#" class="right-icon" @click.prevent="copyUrl"><img src="@/assets/img/icons/ic_copy.svg"/></a>
                                        <input
                                            ref="txtUrl"
                                            class="position-absolute"
                                            type="text"
                                            :value="webrtcAliasDirectLink(webrtcAlias)"
                                            style="opacity:0;z-index:-1;">
                                    </div>
                                </form>

                                <!--
                                <div>
                                    <p>
                                        <span class="font-weight-bold">Host PIN:</span>

                                        {{ showHostPin ? meetingRoom.webrtc.pin : '' }}

                                        <a @click.prevent="showHostPin = !showHostPin" href="#">
                                            {{ showHostPin ? 'Hide' : 'Show' }}
                                        </a>
                                    </p>
                                </div>
                                -->
                            </div>
                        </div>
                        <div class="col-xl-9 mx-auto">
                            <hr/>
                        </div>
                        <!--
                        <div class="col-xl-9 mx-auto">
                            <form class="form-horizontal">
                                <div class="form-group">
                                    <label>Custom welcome message</label>
                                    <p>Add a custom welcome message for all your guests when they join a meeting</p>
                                    <input type="text" class="form-control"/>
                                </div>
                                <div class="form-group">
                                    <label>Custom hero image</label>
                                    <p>Add a hero image for your guests to see</p>
                                    <input
                                        name="hero_image"
                                        id="hero_image" 
                                        class="d-none"
                                        type="file"/>
                                    <label for="hero_image" class="btn btn-outline">Upload file</label>    
                                </div>
                            </form>
                        </div>
                        -->
                    </div>
                </div>
                <div class="col-6 right-side-image d-none d-md-block" :style="backImageStyle">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // import SiteWrapper from '@/views/JoinMeeting/Wrappers/SiteWrapper.vue'
    // import BrandingTable from '@/views/JoinMeeting/Welcome/BrandingTable.vue'
    import axios from 'axios'
    import CopyToClipboardMixin from "../../../mixins/CopyToClipboardMixin";
    import DirectLinkMixin from "../../../mixins/DirectLinkMixin";

    export default {
        name: 'WelcomeAuthorised',
        components: {
            // SiteWrapper,
            // BrandingTable,
        },
        mixins: [CopyToClipboardMixin, DirectLinkMixin],
        props: {
            error: String,
            spWebrtcAlias: {
                default: '',
                type: String
            }
        },
        data() {
            return {
                isFetchingData: true,
                webrtcAlias: '',
                displayName: '',
                callType: 'video',
                conferencingNode: '',
                brand: {},
                host: {
                    name: '',
                    last_name: '',
                },
                meetingRoom: {},
                backImageStyle: '',
                showHostPin: false
            };
        },
        computed: {
            isOneTimeMeeting() {
                return this.$router.currentRoute.name === 'host-one-time-meeting';
            },
        },
        mounted() {
            this.$emit('disable-fullscreen')
            this.getData();
        },
        methods: {
            getData() {
                this.$store.dispatch('setLoadingStatus', 'loading')
                    let url = '/join-meeting-room/' + this.spWebrtcAlias;
                    axios({url: url, method: 'GET'})
                        .then(resp => {
                            let data = resp.data;

                            // Name
                            this.host.name = data.host.name;
                            this.host.last_name = data.host.last_name;
                            this.displayName = data.host.name + ' ' + data.host.last_name;

                            // Meeting room
                            let meetingRoom = data;
                            this.meetingRoom = meetingRoom;
                            this.conferencingNode = meetingRoom.webrtc.conferencing_node;
                            this.webrtcAlias = meetingRoom.webrtc.alias;
                            this.brand = meetingRoom.brand; 

                            if (this.brand.hero_image) {
                                this.backImageStyle = `background-image: url(${this.brand.hero_image})`
                            }

                            this.$store.dispatch('setLogo', { logo: this.brand.logo, level: this.brand.level})

                            this.$store.dispatch('setLoadingStatus', 'success')
                            this.isFetchingData = false;
                        })
                        .catch(errorObject => {
                            this.onError(errorObject);
                        });
            },
            getInstantMeetingRoom() {
                console.log('Creating new room...');
                axios({url: '/start-meeting', method: 'POST', data: {type: 'temporary'}})
                    .then(resp => {
                        this.meetingRoom = resp.data;
                        this.webrtcAlias = resp.data.webrtc.alias;
                        this.isFetchingData = false;
                    })
                    .catch(errorObject => {
                        this.onError(errorObject);
                    });
            },
            onError(errorObject) {
                let statusCode = errorObject.response.status;
                let errorMsg = ('Unexpected error, code ' + statusCode);

                this.redirectBack(errorMsg);
            },
            redirectBack(errorMsg) {

                // @todo Dashboard cannot show errors. Think about it.

                this.$router.push({
                    name: 'dashboard',
                    params: {
                        error: errorMsg || ''
                    }
                });
            },
            copyUrl() {
                this.copyToClipboard(
                    this.$refs.txtUrl
                );
            },
            joinWithVideo() {
                this.callType = 'video';
            },
            joinWithAudio() {
                this.callType = 'audioonly';
            },
            joinMeeting(e) {
                e.preventDefault();
                this.$router.push({
                    name: 'ongoing-meeting',
                    params: {
                        preloadedHostPin: this.meetingRoom.webrtc.pin,
                        meetingRoomId: this.meetingRoom.id,
                        meetingId: this.meetingRoom.meeting_id,
                        webrtcAlias: this.webrtcAlias,
                        displayName: this.displayName,
                        callType: this.callType,
                        conferencingNode: this.conferencingNode,
                        retryConnecting: this.isOneTimeMeeting,
                        previousRoute: {
                            name: this.isOneTimeMeeting ? 'host-one-time-meeting' : 'host',
                            params: {spWebrtcAlias: this.webrtcAlias}
                        }
                    }
                });
            }
        }
    }
</script>
