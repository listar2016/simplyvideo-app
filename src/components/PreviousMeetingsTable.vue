<template>
    <div v-observe-visibility="visibilityChanged">
        <p v-if="showNoMeetingsMessage" class="pl-4 m-0">
            No previous meetings
        </p>
        <div class="table-responsive">
            <table v-if="prevMeetingsData().length" class="table table-borderless table-data">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Time</th>
                    <th>Direct URL</th>
                    <th class="th-record-status">Record Status</th>
                </tr>
                </thead>
                <tbody v-for="item in prevMeetingsData()" :key="item.date">
                <tr class="tr-date">
                    <td colspan="4">{{ item.date | moment('dddd, D MMMM') }}</td>
                </tr>
                <tr v-for="meeting in item.data_list" :key="meeting.id">
                    <td>{{ meeting.subject }}</td>
                    <td>{{ meeting.starts_at | moment('HH:mm') }} - {{ meeting.ends_at | moment('HH:mm') }}</td>
                    <td>
                        <a :href="meetingRoomDirectLink(meeting.id_alias)" target="_blank">{{ meeting.id_alias }}</a>
                    </td>
                    <!-- <td class="td-record-status">
                    <div class="record-status record-status-recording" data-progress="25">
                        <svg class="record-status-svg" width="20" height="20" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <circle r="8" cx="10" cy="10" stroke-width="2" stroke="#F0F0F0" fill="transparent" stroke-dasharray="50.26" stroke-dashoffset="0"></circle>
                        <circle class="record-status-progress" r="8" cx="10" cy="10" stroke-width="2" stroke-linecap="round" stroke="#29CC7A" fill="transparent" stroke-dasharray="50.26" stroke-dashoffset="0" :style="`strokeDashoffset: 37.695px`"></circle>
                        </svg>
                        <div class="record-status-text">25% <span>recording</span></div>
                    </div>
                    </td> -->
                    <td class="td-record-status">
                        <div v-for="record in meeting.recordings" :key="record.id" class="mx-1">
                            <div v-if="record.status === 'Processing'">
                                <span class="fa fa-cog fa-spin"></span> Processing...
                            </div>

                            <div v-if="record.status === 'Processed'">

                                <a
                                        v-if="record.mp4"
                                        class=""
                                        :href="record.mp4"
                                        download
                                        target='_blank'
                                >
                                    Video
                                </a>

                                <a
                                        v-if="record.mp3"
                                        class=""
                                        :href="record.mp3"
                                        download
                                        target='_blank'
                                >
                                    Audio
                                </a>

                                <span v-if="record.mp4 && !record.mp3" class="ml-1">
                                    <span class="fa fa-cog fa-spin"></span>
                                    Audio processing...
                                </span>
                            </div>
                        </div>

                        <small v-if="!meeting.recordings.length">No recordings</small>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="row" v-if="previousMeetingList.last_page > 1">
            <div class="col-12 p-3">
                <label class="float-right font-weight-bold m-2">
                    {{ previousMeetingList.total }} item{{ previousMeetingList.total > 1 ? 's' : '' }},
                    {{ previousMeetingList.last_page }} page{{ previousMeetingList.last_page > 1 ? 's' : '' }}
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
                        :disabled="curPage === previousMeetingList.last_page" 
                        @click.prevent="go(curPage+1)">
                    </button>
                    <button 
                        class="btn btn-outline fas fa-step-forward"
                        :disabled="curPage === previousMeetingList.last_page" 
                        @click.prevent="go(previousMeetingList.last_page)">
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import DirectLinkMixin from "../mixins/DirectLinkMixin";
    import {mapState} from "vuex";

    export default {
        components: {},
        mixins: [
            DirectLinkMixin,
        ],
        props: {},
        data: () => ({
            showNoMeetingsMessage: false,
            curPage: ''
        }),
        mounted() {
        },
        computed: {
            ...mapState({
                previousMeetingList: state => state.meeting.previous_meetings
            }),
            isLoading() {
                return this.$store.getters.authStatus === 'loading'
            },
        },
        watch: {
            previousMeetingList(val) {
                this.curPage = val.current_page
            }
        },
        methods: {
            visibilityChanged(isVisible) {
                if (isVisible && !this.previousMeetingList.data) {
                    this.getData();
                }
            },
            getData() {
                // @TODO pagination
                let param = {
                    page_num: 1,
                    from_date: '1970-01-01',
                    to_date: this.$moment().add(-1, 'days').format('YYYY-MM-DD')
                };
                this.$store.dispatch('getPreviousMeetingsData', param)
            },
            prevMeetingsData() {
                let prevMeetingsData = [];
                if (!this.previousMeetingList.data) return prevMeetingsData;
                let moveDate = '';
                let moveList = [];
                let vm = this;
                for (const item of this.previousMeetingList.data) {
                    let curDate = vm.$moment(item.starts_at).format('YYYY-MM-DD');
                    if (moveDate != curDate) {
                        if (moveDate) {
                            prevMeetingsData.push({
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
                    moveList.push(detailMeeting)
                }
                if (moveDate) {
                    prevMeetingsData.push({
                        date: moveDate,
                        data_list: moveList
                    });
                }

                window.setTimeout(() => {
                    if (!this.isLoading && !prevMeetingsData.length) {
                        this.showNoMeetingsMessage = true;
                        return;
                    }
                    this.showNoMeetingsMessage = false;
                }, 500);

                return prevMeetingsData;
            },
            go(pageNum) {
                let param = {
                    page_num: pageNum,
                    from_date: '1970-01-01',
                    to_date: this.$moment().add(-1, 'days').format('YYYY-MM-DD')
                };
                this.$store.dispatch('getPreviousMeetingsData', param)
            }
        },
    }
</script>