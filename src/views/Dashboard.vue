<template>
    <main id="site-wrapper">
        <section class="section">
            <div class="container-fluid">
                <div class="section-header">
                    <h1>Dashboard</h1>
                </div>
                <!--
                <div class="row row-has-panel">
                    <div class="col-lg-12">
                        <div class="section-panel">
                            <div class="section-panel-alert" data-alert="danger">
                                <div class="section-panel-alert-content">
                                    <div class="icon">
                                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                            <path fill="currentColor" d="M16,22 L8,22 C7.44771525,22 7,21.5522847 7,21 C7,20.4871642 7.38604019,20.0644928 7.88337887,20.0067277 L8,20 L11,20 L11,18 L4,18 C2.34314575,18 1,16.6568542 1,15 L1,5 C1,3.34314575 2.34314575,2 4,2 L20,2 C21.6568542,2 23,3.34314575 23,5 L23,15 C23,16.6568542 21.6568542,18 20,18 L13,18 L13,20 L16,20 C16.5128358,20 16.9355072,20.3860402 16.9932723,20.8833789 L17,21 C17,21.5128358 16.6139598,21.9355072 16.1166211,21.9932723 L16,22 L8,22 L16,22 Z M20,4 L4,4 C3.44771525,4 3,4.44771525 3,5 L3,15 C3,15.5522847 3.44771525,16 4,16 L20,16 C20.5522847,16 21,15.5522847 21,15 L21,5 C21,4.44771525 20.5522847,4 20,4 Z"></path>
                                        </svg>
                                    </div>
                                    <div class="content">
                                        <p>You have a meeting due to start.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                -->
                <div class="row row-has-panel">
                    <div class="col-lg-6">

                        <div class="section-panel">
                            <div class="section-panel-header">
                                <div class="section-panel-header-title">
                                    <div class="icon">
                                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
                                             xmlns:xlink="http://www.w3.org/1999/xlink">
                                            <path fill="currentColor"
                                                  d="M16,22 L8,22 C7.44771525,22 7,21.5522847 7,21 C7,20.4871642 7.38604019,20.0644928 7.88337887,20.0067277 L8,20 L11,20 L11,18 L4,18 C2.34314575,18 1,16.6568542 1,15 L1,5 C1,3.34314575 2.34314575,2 4,2 L20,2 C21.6568542,2 23,3.34314575 23,5 L23,15 C23,16.6568542 21.6568542,18 20,18 L13,18 L13,20 L16,20 C16.5128358,20 16.9355072,20.3860402 16.9932723,20.8833789 L17,21 C17,21.5128358 16.6139598,21.9355072 16.1166211,21.9932723 L16,22 L8,22 L16,22 Z M20,4 L4,4 C3.44771525,4 3,4.44771525 3,5 L3,15 C3,15.5522847 3.44771525,16 4,16 L20,16 C20.5522847,16 21,15.5522847 21,15 L21,5 C21,4.44771525 20.5522847,4 20,4 Z"></path>
                                        </svg>
                                    </div>
                                    <div class="content">
                                        <h3>Host a meeting now</h3>
                                    </div>
                                </div>
                            </div>
                            <div class="section-panel-body text-center">
                                <router-link v-if="auth && auth.meeting_room" :to="{name: 'host', params: { spWebrtcAlias: auth.meeting_room.webrtc.alias}}">
                                    <button class="btn btn-primary mb-1">Host now</button>
                                </router-link>

                                <!--

                                Pexip needs up to 60 seconds to setup one-time meeting room.
                                This feature will be commented out until we implement pools of pre-created rooms.

                                <br>

                                <router-link :to="{name: 'host-one-time-meeting'}">
                                    Host one time meeting
                                </router-link>
                                -->
                            </div>
                        </div>

                        <div class="section-panel">
                            <div class="section-panel-header">
                                <div class="section-panel-header-title">
                                    <div class="icon">
                                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
                                             xmlns:xlink="http://www.w3.org/1999/xlink">
                                            <path fill="currentColor"
                                                  d="M16,22 L8,22 C7.44771525,22 7,21.5522847 7,21 C7,20.4871642 7.38604019,20.0644928 7.88337887,20.0067277 L8,20 L11,20 L11,18 L4,18 C2.34314575,18 1,16.6568542 1,15 L1,5 C1,3.34314575 2.34314575,2 4,2 L20,2 C21.6568542,2 23,3.34314575 23,5 L23,15 C23,16.6568542 21.6568542,18 20,18 L13,18 L13,20 L16,20 C16.5128358,20 16.9355072,20.3860402 16.9932723,20.8833789 L17,21 C17,21.5128358 16.6139598,21.9355072 16.1166211,21.9932723 L16,22 L8,22 L16,22 Z M20,4 L4,4 C3.44771525,4 3,4.44771525 3,5 L3,15 C3,15.5522847 3.44771525,16 4,16 L20,16 C20.5522847,16 21,15.5522847 21,15 L21,5 C21,4.44771525 20.5522847,4 20,4 Z"></path>
                                        </svg>
                                    </div>
                                    <div class="content">
                                        <h3>Upcoming Meetings</h3>
                                    </div>
                                </div>
                            </div>
                            <div class="section-panel-body">
                                <table class="table table-borderless table-data">
                                    <tbody v-if="upcomingMeetingList.data && upcomingMeetingList.data.length > 0">
                                    <tr v-for="meeting in upcomingMeetingList.data" :key="meeting.id">
                                        <td>
                                            <a :href="meetingRoomDirectLink(meeting.meeting_room.webrtc.alias)" target="_blank">
                                                {{ meeting.subject }}
                                            </a>
                                            <span class="time">{{ }} {{ meeting.starts_at | moment('dddd, D MMMM h:mm A') }}</span>
                                        </td>
                                        <td>
                                            <meeting-invites-dropdown :meeting="meeting">
                                                <a class="dropdown-toggle" :id="'sendInvites-' + meeting.id" data-toggle="dropdown">
                                                    Send invites
                                                </a>
                                            </meeting-invites-dropdown>
                                        </td>
                                    </tr>
                                    </tbody>
                                    <tbody v-else>
                                    <tr>
                                        <td>No upcoming meetings</td>
                                    </tr>
                                    </tbody>
                                </table>
                                <div class="row" v-if="upcomingMeetingList.last_page > 1">
                                    <div class="col-12 p-3">
                                        <label class="float-right font-weight-bold m-2">
                                            {{ upcomingMeetingList.total }} item{{ upcomingMeetingList.total > 1 ? 's' : ''}},
                                            {{ upcomingMeetingList.last_page }} page{{ upcomingMeetingList.last_page > 1 ? 's' : ''}}
                                        </label>
                                        <div class="pagiantion float-right">
                                            <button 
                                                class="btn btn-outline fas fa-step-backward" 
                                                :disabled="curPage === 1" 
                                                @click="go(1)">
                                            </button>
                                            <button 
                                                class="btn btn-outline fas fa-angle-left"
                                                :disabled="curPage === 1" 
                                                @click.prevent="go(curPage-1)">
                                            </button>
                                            <input 
                                                type="text" 
                                                class="text-center" 
                                                v-model="curPage" 
                                                @keyup.enter="go(curPage)"/>
                                            <button 
                                                class="btn btn-outline fas fa-angle-right"
                                                :disabled="curPage === upcomingMeetingList.last_page" 
                                                @click.prevent="go(curPage+1)">
                                            </button>
                                            <button 
                                                class="btn btn-outline fas fa-step-forward"
                                                :disabled="curPage === upcomingMeetingList.last_page" 
                                                @click.prevent="go(upcomingMeetingList.last_page)">
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="section-panel">
                            <div class="section-panel-header">
                                <div class="section-panel-header-title">
                                    <div class="icon">
                                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
                                             xmlns:xlink="http://www.w3.org/1999/xlink">
                                            <path fill="currentColor"
                                                  d="M16,22 L8,22 C7.44771525,22 7,21.5522847 7,21 C7,20.4871642 7.38604019,20.0644928 7.88337887,20.0067277 L8,20 L11,20 L11,18 L4,18 C2.34314575,18 1,16.6568542 1,15 L1,5 C1,3.34314575 2.34314575,2 4,2 L20,2 C21.6568542,2 23,3.34314575 23,5 L23,15 C23,16.6568542 21.6568542,18 20,18 L13,18 L13,20 L16,20 C16.5128358,20 16.9355072,20.3860402 16.9932723,20.8833789 L17,21 C17,21.5128358 16.6139598,21.9355072 16.1166211,21.9932723 L16,22 L8,22 L16,22 Z M20,4 L4,4 C3.44771525,4 3,4.44771525 3,5 L3,15 C3,15.5522847 3.44771525,16 4,16 L20,16 C20.5522847,16 21,15.5522847 21,15 L21,5 C21,4.44771525 20.5522847,4 20,4 Z"></path>
                                        </svg>
                                    </div>
                                    <div class="content">
                                        <h3>Schedule a meeting</h3>
                                    </div>
                                </div>
                            </div>
                            <!--
                            -->
                            <div class="section-panel-body text-center">
                                <!--
                                <div class="schedule-meeting-message">
                                    <h6>Schedule a meeting</h6>
                                    <p>
                                        So there is no need to remember a password. Check your email for your quick login code and enter it here
                                    </p>
                                    <a href="#" class="btn btn-gray"><img alt="" src="@/assets/img/icons/icon-plus.svg" />Open calendar</a>
                                </div>
                                -->
                                <router-link :to="{name: 'meeting'}" class="btn btn-gray"><img alt=""
                                                                                               src="@/assets/img/icons/icon-plus.svg"/>Schedule
                                    a meeting
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
                <!--
                <div class="row row-has-panel">
                    <div class="col-lg-12">
                        <div class="section-panel">
                            <div class="section-panel-header">
                                <div class="section-panel-header-title">
                                    <div class="icon">
                                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
                                             xmlns:xlink="http://www.w3.org/1999/xlink">
                                            <path fill="currentColor"
                                                  d="M16,22 L8,22 C7.44771525,22 7,21.5522847 7,21 C7,20.4871642 7.38604019,20.0644928 7.88337887,20.0067277 L8,20 L11,20 L11,18 L4,18 C2.34314575,18 1,16.6568542 1,15 L1,5 C1,3.34314575 2.34314575,2 4,2 L20,2 C21.6568542,2 23,3.34314575 23,5 L23,15 C23,16.6568542 21.6568542,18 20,18 L13,18 L13,20 L16,20 C16.5128358,20 16.9355072,20.3860402 16.9932723,20.8833789 L17,21 C17,21.5128358 16.6139598,21.9355072 16.1166211,21.9932723 L16,22 L8,22 L16,22 Z M20,4 L4,4 C3.44771525,4 3,4.44771525 3,5 L3,15 C3,15.5522847 3.44771525,16 4,16 L20,16 C20.5522847,16 21,15.5522847 21,15 L21,5 C21,4.44771525 20.5522847,4 20,4 Z"></path>
                                        </svg>
                                    </div>
                                    <div class="content">
                                        <h3>Upcoming Meetings</h3>
                                    </div>
                                </div>
                            </div>
                            <div class="section-panel-body">
                                <upcoming-meetings-table></upcoming-meetings-table>
                            </div>
                        </div>
                    </div>
                </div>
                -->
            </div>
        </section>
    </main>
</template>

<script>
    import MeetingInvitesDropdown from "../components/MeetingInvitesDropdown";
    import {mapState} from 'vuex'
    import DirectLinkMixin from "../mixins/DirectLinkMixin";
    // import UpcomingMeetingsTable from "../components/UpcomingMeetingsTable";


    export default {
        name: 'home',
        components: {
            MeetingInvitesDropdown,
            // UpcomingMeetingsTable
        },
        mixins: [DirectLinkMixin],
        props: {
            reloadRequired: Boolean,
        },
        computed: {
            ...mapState({
                upcomingMeetingList: state => state.meeting.upcoming_meetings,
                auth: state => state.auth.user
            })
        },
        data: () => ({
            curPage: ''
        }),
        watch: {
            upcomingMeetingList(val) {
                this.curPage = val.current_page
            }
        },
        created() {
            this.$store.dispatch('getUserProfile').then(() => {
                this.$store.dispatch('getUpcomingMeetingsData', '')
                this.changeFavicon()
            })
            .catch(err => {
                this.$toast.error(err)
            });
        },
        mounted() {
            this.$emit('disable-fullscreen')
            if (this.reloadRequired) { // Otherwise Pexip doesn't release the camera and webcam light stays on
                window.location.reload();
            }
        },
        methods: {
            go(pageNum) {
                this.$store.dispatch('getUpcomingMeetingsData', pageNum)
            },
            changeFavicon() {
                var link = document.createElement('link'),
                    oldLink = document.getElementById('dynamic-favicon')
                link.id = 'dynamic-favicon'
                link.rel = 'shortcut icon'
                if (this.auth.meeting_room.brand.favicon) {
                    link.href = this.auth.meeting_room.brand.favicon
                } else {
                    link.href = ''
                }
                if (oldLink) {
                    document.head.removeChild(oldLink);
                }
                document.head.appendChild(link);
            }
        },
    }
</script>
