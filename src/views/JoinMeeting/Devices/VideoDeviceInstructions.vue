<template>
    <div class="d-flex h-100 justify-content-center pt-4 bg-white">

        <div v-if="isFetchingData">
            <span class="fa fa-cog fa-spin mr-1"></span> Loading...
        </div>

        <div v-else class="w-100">

            <h5 class="my-5 text-center">
                Join with a Video Conferencing device
            </h5>
            <div class="row col-xl-9  mx-auto">
                <div class="col-sm-6">
                    <div class="device-instruction">
                        <div class="circle-number my-3">1</div>
                        <h6 class="my-2">Join with a Alpha-numeric device</h6>
                        <p>Our device expects both letters and numbers</p>
                        <router-link
                            :to="{name: 'alpha-numeric-instructions', params: {
                                preloadedMeetingRoom: this.meetingRoom,
                            }}"
                        >
                            <button class="btn btn-primary">That's me</button>
                        </router-link>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="device-instruction">
                        <div class="circle-number my-3">2</div>
                        <h6 class="my-2">Join with a numeric only device</h6>
                        <p>Our device only does numbers and #'s</p>
                        <router-link
                            :to="{name: 'numeric-instructions', params: {
                                preloadedMeetingRoom: this.meetingRoom,
                            }}"
                        >
                            <button class="btn btn-primary">That's me</button>
                        </router-link>
                    </div>
                </div>
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
</template>

<script>
    import {mapState} from "vuex";
    import axios from "axios";
    import Vue from "vue";

    export default {
        name: 'VideoDeviceInstructions',
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
                this.redirectIfNoGatewayLicense();
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
                        this.redirectIfNoGatewayLicense();
                        this.isFetchingData = false;
                    })
                    .catch((err) => {
                        this.onFetchingError(err);
                    });
            },
            redirectIfNoGatewayLicense() {
                if (!this.meetingRoom.has_gateway_license) {
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
        }
    }
</script>
