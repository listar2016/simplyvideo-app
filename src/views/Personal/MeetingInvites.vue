<template>
    <main id="site-wrapper">
        <section class="section">
            <div class="container-fluid">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#">Personal</a></li>
                    <li class="breadcrumb-item active">Meetings</li>
                </ol>
                <div class="section-header">
                    <div class="section-header-title">
                        <router-link class="section-header-back" :to="{name: 'meetings'}"><i
                                class="far fa-arrow-circle-left"></i></router-link>
                        <div class="section-header-title-group">
                            <h1>Meeting {{ updated ? 'updated' : 'saved'}}!</h1>
                            <!--
                            <p>You can get direct-access link, Google Calendar link, ICS file for Outlook, or plaintext
                                file</p>
                            -->
                        </div>
                    </div>
                </div>
                <div class="row row-has-panel">
                    <div :class="isShowGotcha ? 'col-xl-9' : 'col-xl-12'">
                        <div class="section-panel">
                            <div class="section-panel-body">

                                <div class="row">
                                    <div class="col-12">

                                        <h3 class="mb-1">Invite participants now:</h3>

                                        <b>Direct URL:</b> <a :href="url" target="_blank">{{ url }}</a>

                                        <br>
                                        <b>Subject:</b> {{ selMeeting.subject }}
                                        <br>
                                        <b>Time:</b>
                                        <span v-if="selMeeting.starts_at">
                                            {{ $moment(selMeeting.starts_at, 'YYYY-MM-DD HH:mm').format('DD-MM-YYYY HH:mm') }}
                                            -
                                            {{ $moment(selMeeting.ends_at, 'YYYY-MM-DD HH:mm').format('HH:mm') }}
                                        </span>
                                        <br>
                                        <b>Description:</b> {{ selMeeting.description }}

                                        <br>
                                        <br>
                                    </div>
                                </div>

                                <div class="row h-inline-btn-group">
                                    <div class="col-lg-6 text-center text-md-left">
                                        <a :href="selMeeting.calendar ? selMeeting.calendar.google : ''"
                                           target="_blank"
                                           class="btn btn-danger">
                                            Open in Gcal
                                        </a>
                                        <a
                                            :href="selMeeting.calendar ? selMeeting.calendar.ics : ''"
                                            class="btn btn-primary ml-md-2"
                                            :download="icsFilename"
                                        >
                                            Download ICS
                                        </a>
                                    </div>
                                    <div class="col-lg-6 text-center text-md-right mt-1 mt-lg-0">

                                        <button @click="copyTextInvite" class="btn btn-gray ml-md-2">Copy Text invite
                                        </button>
                                        <textarea ref="txtInvite" class="position-absolute" type="text"
                                                  :value="textInvite"
                                                  style="opacity: 0;z-index:-1;"></textarea>

                                        <button @click="copyUrl" class="btn btn-gray ml-md-2">Copy URL</button>
                                        <input ref="txtUrl" class="position-absolute" type="text" :value="url"
                                               style="opacity:0;z-index:-1;">
                                    </div>
                                </div>

                                <hr>
                                <div class="row">
                                    <div class="col-12 text-right">
                                        <router-link :to="{name: 'meetings'}">
                                            <button class="btn btn-gray">Done</button>
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="section-panel mt-2">
                            <div class="section-panel-body">
                                <plugins></plugins>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl mt-2 mt-xl-0" v-if="isShowGotcha">
                        <gotcha :tip-list="tipList" @close="isShowGotcha = false"></gotcha>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>
<script>
    import Gotcha from '@/components/Gotcha'
    import {mapState} from 'vuex'
    import Plugins from "../../components/Plugins";

    export default {
        components: {
            Gotcha,
            Plugins
        },
        props: [
            'id'
        ],
        computed: {
            ...mapState({
                selMeeting: state => state.meeting.sel_meeting
            }),
            updated() {
                return this.$router.currentRoute.name === 'meeting-updated';
            },
            url() {
                if (!this.selMeeting.meeting_room){
                    return '';
                }
                let a = document.createElement('a');
                a.href = this.$router.resolve({
                    name: 'welcome-guest',
                    params: {
                        webrtcAlias: this.selMeeting.meeting_room ? this.selMeeting.meeting_room.webrtc.alias : ''
                    }
                }).href;
                return a.href;
            },
            textInvite() {
                let format = 'YYYY-MM-DD HH:mm';

                return 'Subject: ' + this.selMeeting.subject
                    + '\n'
                    + 'Time: ' + this.$moment(this.selMeeting.starts_at, format).format('DD-MM-YYYY HH:mm')
                    + ' - ' + this.$moment(this.selMeeting.ends_at, format).format('HH:mm')
                    + '\n'
                    + 'Description: '
                    + '\n'
                    + this.selMeeting.description
                    + '\n'
                    + '\n'
                    + 'Direct URL: ' + this.url
                    ;
            },
            icsFilename() {
                return 'SimplyVideo Invite ' + this.selMeeting.id;
            }
        },
        data() {
            return {
                tipList: [
                    "Create a scheduled calls here by filling out the subject, date and time",
                    "Send invites to your guest via your email provider or share in plain text by copy & pasting"
                ],
                isShowGotcha: true,
            }
        },
        created() {
            if (this.id) {
                this.$store.dispatch('getMeeting', this.id)
                    .then(() => {
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        },
        mounted() {
        },
        methods: {
            copyUrl() {
                this.copyToClipboard(
                    this.$refs.txtUrl
                );
            },
            copyTextInvite() {
                this.copyToClipboard(
                    this.$refs.txtInvite
                );
            },
            copyToClipboard(domElement) {
                // let txtUrl = this.$refs.txtUrl;

                domElement.setAttribute('type', 'text');
                domElement.select();

                try {
                    let successful = document.execCommand('copy');
                    if (successful) {
                        this.$toast.success('Copied successfully')
                    } else {
                        this.$toast.error('Oops, unable to copy')
                    }
                } catch (err) {
                    this.$toast.error('Oops, unable to copy')
                }

                window.getSelection().removeAllRanges()
            },
        },
    }
</script>