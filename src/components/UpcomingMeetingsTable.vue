<template>
    <div>
        <p v-if="showNoMeetingsMessage" class="pl-4 m-0">
            No upcoming meetings
        </p>
        <div class="table-responsive">
            <table v-if="upMeetingsData().length" class="table table-borderless table-data">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Time</th>
                    <th>Direct URL</th>
                    <th>&nbsp;</th>
                </tr>
                </thead>
                <tbody v-for="item in upMeetingsData()" :key="item.date">
                <tr class="tr-date">
                    <td colspan="4">{{ item.date | moment('dddd, D MMMM') }}</td>
                </tr>
                <tr v-for="meeting in item.data_list" :key="meeting.id">
                    <td>{{ meeting.subject }}</td>
                    <td>{{ meeting.starts_at | moment('HH:mm') }} - {{ meeting.ends_at | moment('HH:mm') }}</td>
                    <td>
                        <a :href="meetingRoomDirectLink(meeting.id_alias)" target="_blank">{{ meeting.id_alias }}</a>
                    </td>
                    <td class="td-action text-right">
                        <router-link class="table-action" :to="{name: 'meeting', params: {id: meeting.id} }">
                            <!-- <i class="fa fa-pencil"></i> -->
                            <img src="@/assets/img/icons/icon-edit-grey.svg" class="mr-2" />
                            Edit
                        </router-link>
                        <a href="#" class="table-action" @click.prevent="deleteMeeting(meeting.id)">
                            <i class="fal fa-times"></i>
                            Delete
                        </a>
                        <!--
                        <a href="#" class="table-action" @click.prevent="sendInvites(meeting.id)">
                        <img alt="" src="@/assets/img/icons/icon-plus-primary.svg" class="mr-1"/> Send Invites
                        </a>
                        -->
                        <meeting-invites-dropdown :meeting="meeting"></meeting-invites-dropdown>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="row" v-if="upcomingMeetingList.last_page > 1">
            <div class="col-12 p-3">
                <label class="float-right font-weight-bold m-2">
                    {{ upcomingMeetingList.total }} item{{ upcomingMeetingList.total > 1 ? 's' : '' }},
                    {{ upcomingMeetingList.last_page }} page{{ upcomingMeetingList.last_page > 1 ? 's' : '' }}
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
</template>
<script>
    import {mapState} from 'vuex'
    import MeetingInvitesDropdown from "./MeetingInvitesDropdown";
    import DirectLinkMixin from "../mixins/DirectLinkMixin";

    export default {
        components: {
            MeetingInvitesDropdown,
        },
        mixins: [
            DirectLinkMixin,
        ],
        props: {},
        data: () => ({
            showNoMeetingsMessage: false,
            curPage: ''
        }),
        created() {
            // @TODO pagination
            this.$store.dispatch('getUpcomingMeetingsData', '')
        },
        computed: {
            ...mapState({
                upcomingMeetingList: state => state.meeting.upcoming_meetings,
            }),
            isLoading() {
                return this.$store.getters.authStatus === 'loading'
            },
        },
        watch: {
            upcomingMeetingList(val) {
                this.curPage = val.current_page
            }
        },
        methods: {
            upMeetingsData() {
                let upMeetingsData = [];
                if (!this.upcomingMeetingList.data) return upMeetingsData;
                let moveDate = '';
                let moveList = [];
                let vm = this;
                for (const item of this.upcomingMeetingList.data) {
                    let curDate = vm.$moment(item.starts_at).format('YYYY-MM-DD');
                    if (moveDate != curDate) {
                        if (moveDate) {
                            upMeetingsData.push({
                                date: moveDate,
                                data_list: moveList
                            });
                            moveList = [];
                        }
                    }
                    moveDate = curDate;
                    let detailMeeting = {
                        id: item.id,
                        subject: item.subject,
                        description: item.description,
                        starts_at: item.starts_at,
                        ends_at: item.ends_at,
                        calendar: item.calendar,
                        meeting_room: item.meeting_room,
                        id_alias: item.meeting_room.webrtc.alias,
                        recordings: item.recordings
                    };
                    moveList.push(detailMeeting);
                }
                if (moveDate) {
                    upMeetingsData.push({
                        date: moveDate,
                        data_list: moveList
                    });
                }

                window.setTimeout(() => {
                    if (!this.isLoading && !upMeetingsData.length) {
                        this.showNoMeetingsMessage = true;
                        return;
                    }
                    this.showNoMeetingsMessage = false;
                }, 500);

                return upMeetingsData;
            },
            deleteMeeting(id) {
                this.$store.dispatch('deleteMeeting', id)
                    .then(() => {
                        this.$toast.success("The current meeting is deleted successfully!")
                    })
                    .catch(err => {
                        this.$toast.error(err)
                    })
            },
            go(pageNum) {
                this.$store.dispatch('getUpcomingMeetingsData', pageNum)
            }
        },
    }
</script>