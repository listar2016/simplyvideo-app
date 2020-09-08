<template>
    <div class="justify-content-center">

        <div v-if="isFetchingData" class="mt-4 text-center">
            <span class="fa fa-cog fa-spin mr-1"></span> Loading...
        </div>

        <div v-else class="w-100 row">
            <div class="row col-xl-9 mx-auto">
                <div class="col-12">
                    <h5 class="mb-2 mt-4">Join with Skype for Business</h5>
                </div>
                <div class="col-lg-6">
                    <div class="row">
                        <div class="col-12 telephone-container">
                            <div class="circle-container">
                                <div class="circle-number">1</div>
                            </div>
                            <div class="telephone-content">
                                <h6 class="my-1">Open your Skype for Business</h6>
                                <p>Open skype for Business as you normally would</p>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 telephone-container">
                            <div class="circle-container">
                                <div class="circle-number">2</div>
                            </div>
                            <div class="telephone-content">
                                <h6 class="my-1">Add the address to your contacts</h6>
                                <p>Take the below address and add it to your contacts</p>
                                <form class="form-horizontal">
                                    <div class="form-group with-right-icon">
                                        <label class="sr-only">Skype ID</label>
                                        <input type="text" class="form-control border-dash" id="txt-skype-id" placeholder="Skype ID" v-model="meetingRoom.skype.address" readonly/>
                                        <a href="#" class="right-icon" @click.prevent="copyText"><img src="@/assets/img/icons/ic_copy.svg"/></a>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 telephone-container">
                            <div class="circle-container">
                                <div class="circle-number">3</div>
                            </div>
                            <div class="telephone-content">
                                <h6 class="my-1">Click call to start a video meeting</h6>
                                <p>You can join with video or audio only</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <h6 class="my-1">Small video tour</h6>
                    <p>Watch small tour how to Join with Skype in three steps</p>
                    <video 
                        width="100%" 
                        controls 
                        poster="@/assets/img/image_skype.jpg">
                        <source src="@/assets/video/sample.mp4" type="video/mp4">
                    </video>
                </div>
            <!--
            <router-link
                    :to="{name: 'welcome-guest', params: {
                    webrtcAlias: this.webrtcAlias,
                    preloadedMeetingRoom: this.meetingRoom
                }}"
            >
                Go back
            </router-link> -->
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    import axios from "axios";
    import Vue from 'vue';

    export default {
        name: 'SkypeInstructions',
        components: {},
        props: {
            webrtcAlias: String,
            preloadedMeetingRoom: Object,
        },
        data() {
            return {
                isFetchingData: true,
                meetingRoom: this.preloadedMeetingRoom ? Vue.util.extend({}, this.preloadedMeetingRoom) : null,
            };
        },
        computed: {
            ...mapState({
                isLoggedIn: state => !!state.auth.token,
            })
        },
        mounted() {
            if (this.meetingRoom) {
                this.redirectIfSkypeNotSupported();
                this.isFetchingData = false;
                this.$store.dispatch('setLogo', {
                    logo: this.meetingRoom.brand.logo,
                    level: this.meetingRoom.brand.level
                });
                this.$store.dispatch('setGuestWelcomeMessage', this.meetingRoom.brand.guest_welcome_message);
                return;
            }

            this.getData();
        },
        methods: {
            getData() {
                let url = '/join-meeting-room/' + this.webrtcAlias;

                axios({url: url, method: 'GET'})
                    .then(resp => {
                        let data = resp.data;
                        this.meetingRoom = data;
                        this.$store.dispatch('setLogo', {
                            logo: this.meetingRoom.brand.logo,
                            level: this.meetingRoom.brand.level
                        });
                        this.$store.dispatch('setGuestWelcomeMessage', this.meetingRoom.brand.guest_welcome_message);
                        this.redirectIfSkypeNotSupported();
                        this.isFetchingData = false;
                    })
                    .catch((err) => {
                        this.onFetchingError(err);
                    });
            },
            redirectIfSkypeNotSupported() {
                if (!this.meetingRoom.skype) {
                    this.$router.push({
                        name: 'welcome-guest',
                        params: {
                            webrtcAlias: this.webrtcAlias,
                            preloadedMeetingRoom: this.meetingRoom
                        }
                    });
                }
            },
            onFetchingError(err) {
                let statusCode = err.response.status;
                let error = statusCode === 404 ? 'Meeting not found' : ('Unexpected error, code ' + statusCode);

                this.$router.push({
                    name: 'join-meeting',
                    params: {
                        error: error
                    }
                });
            },
            copyText() {
                let txtSkypeId = document.querySelector('#txt-skype-id')
                txtSkypeId.setAttribute('type', 'text')
                txtSkypeId.select()

                try {
                    var successful = document.execCommand('copy')
                    if (successful) {
                        this.$toast.success('Skype id was copied successfully')
                    } else {
                        this.$toast.error('Oops, unable to copy')    
                    }
                } catch (err) {
                    this.$toast.error('Oops, unable to copy')
                }

                window.getSelection().removeAllRanges()
            }
        }
    }
</script>
