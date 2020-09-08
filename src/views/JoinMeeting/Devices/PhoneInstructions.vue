<template>
    <div class="justify-content-center">

        <div v-if="isFetchingData" class="mt-4 text-center">
            <span class="fa fa-cog fa-spin mr-1"></span> Loading...
        </div>

        <div v-else class="w-100 row">
            <div class="row col-xl-9 mx-auto">
                <div class="col-12">
                    <h5 class="mb-2 mt-4">Join with telephone</h5>
                </div>
                <div class="col-lg-6">
                    <!--
                    <div class="row">
                        <div class="col-12 telephone-container">
                            <div class="circle-container">
                                <div class="circle-number">1</div>
                            </div>
                            <div class="telephone-content">
                                <h6 class="my-1">Add your number</h6>
                                <p>We need this to make sure you name comes up when speaking</p>
                                <form class="form-horizontal">
                                    <div class="form-group">
                                        <label class="sr-only">Your number</label>
                                        <input type="text" class="form-control" placeholder="Your number"/>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    -->
                    <div class="row">
                        <div class="col-12 telephone-container">
                            <div class="circle-container">
                                <div class="circle-number">1</div>
                            </div>
                            <div class="telephone-content">
                                <h6 class="my-1">Dial the conference number</h6>
                                <p>Pick your local number below</p>
                                <form class="form-horizontal">
                                    <div class="form-group">
                                        <label class="sr-only">Phone number</label>
                                        <!--
                                        <input type="text" class="form-control" placeholder="Phone number"/>
                                        <vue-phone-number-input disabled v-model="selectedPhoneNumber"></vue-phone-number-input>
                                        -->

                                        <div v-if="isFetchingPhones" class="mt-1">
                                            <span class="fa fa-cog fa-spin mr-1"></span> Loading...
                                        </div>
                                        <div v-else>
                                            <select v-model="selectedPhoneNumber" class="form-control">
                                                <option
                                                        v-for="phone in phoneNumbers"
                                                        :key="phone.country"
                                                        :value="phone.country"
                                                >
                                                    {{ phone.country }}
                                                    {{ phone.phone_number }}
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 telephone-container">
                            <div class="circle-container">
                                <div class="circle-number">2</div>
                            </div>
                            <div class="telephone-content">
                                <h6 class="my-1">Enter the conference ID</h6>
                                <p>When promted enter this conference ID</p>

                                <form class="form-horizontal">
                                    <div class="form-group with-right-icon">
                                        <label class="sr-only">Conference ID</label>
                                        <input type="text" class="form-control border-dash" id="txt-conference-id" placeholder="Conference ID" v-model="meetingRoom.phone.conference_id" readonly/>
                                        <a href="#" class="right-icon" @click.prevent="copyAddress('#txt-conference-id')"><img src="@/assets/img/icons/ic_copy.svg"/></a>
                                    </div>
                                </form>
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
    import Vue from "vue";
    // import VuePhoneNumberInput from 'vue-phone-number-input'
    import 'vue-phone-number-input/dist/vue-phone-number-input.css'
    export default {
        name: 'PhoneInstructions',
        components: {
            // VuePhoneNumberInput
        },
        props: {
            webrtcAlias: String,
            preloadedMeetingRoom: Object,
        },
        data() {
            return {
                isFetchingData: true,
                isFetchingPhones: true,
                phoneNumbers: [],
                selectedPhoneNumber: 'United Kingdom',
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
                this.isFetchingData = false;
                this.$store.dispatch('setLogo', {
                    logo: this.meetingRoom.brand.logo,
                    level: this.meetingRoom.brand.level
                });
                this.$store.dispatch('setGuestWelcomeMessage', this.meetingRoom.brand.guest_welcome_message);
                this.getPhones();
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
                        this.isFetchingData = false;
                        this.getPhones();
                    })
                    .catch((err) => {
                        this.onFetchingError(err);
                    });
            },
            getPhones() {
                let url = '/phone-numbers';

                axios({url: url, method: 'GET'})
                    .then(resp => {
                        this.phoneNumbers = resp.data;
                        this.isFetchingPhones = false;
                    })
                    .catch((err) => {
                        this.isFetchingPhones = false;
                        console.log(err);
                    });
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
            copyAddress(selector) { // selector - "#txt-conference-id"
                let txtNumericAddress = document.querySelector(selector)
                txtNumericAddress.setAttribute('type', 'text')
                txtNumericAddress.select()

                try {
                    var successful = document.execCommand('copy')
                    if (successful) {
                        this.$toast.success('Conference ID was copied successfully')
                    } else {
                        this.$toast.error('Oops, unable to copy')
                    }
                } catch (err) {
                    this.$toast.error('Oops, unable to copy')
                }

                window.getSelection().removeAllRanges()
            },
        }
    }
</script>
