<template>
  <main id="site-wrapper">
    <section class="section">
      <div class="container-fluid">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="#">Personal</a></li>
          <li class="breadcrumb-item active">Recordings</li>
        </ol>
        <div class="section-header">
          <div class="section-header-title">
            <router-link class="section-header-back" :to="{name: 'dashboard'}"><i class="far fa-arrow-circle-left"></i></router-link>
            <h1>Recordings</h1>
          </div>
        </div>
        <div class="row row-has-panel">
          <div :class="isShowGotcha ? 'col-xl-9' : 'col-xl-12'">
            <div class="section-panel">
              <div class="section-panel-header">
                <div class="section-panel-header-title">
                  <h3>My recordings</h3>
                </div>
                <div class="section-panel-header-action">
                  <router-link :to="{name: 'account-plan'}" class="btn btn-link">
                    <img alt="" src="@/assets/img/icons/icon-plus-primary.svg" />Upgrade storage
                  </router-link>
                </div>
              </div>
                <div v-if="storageFetched" class="section-panel-body">


                  <div v-if="activeStorageAddon">
                    <span v-if="!hasFixedGbsPlan">
                      Current plan: {{ activeStorageAddon.name }}
                    </span>
                  </div>
                  <div v-else>
                      Please <router-link :to="{name: 'account-plan'}" class="">upgrade</router-link>
                      your storage addon to access recordings
                  </div>

                  <div v-if="recordingsStorage.active_storage_addon && recordingsStorage.has_fixed_gbs_plan">
                    Total storage: {{ totalStorageGb }}GB
                    <br>

                    Free storage: {{ freeStorageGb }}GB
                  </div>

                  <div v-if="!recordingList.data.length">
                    <br>
                    <small>There are no recordings to display</small>
                  </div>
                  <div class="table-responsive">
                    <table v-if="activeStorageAddon && recordingList.data.length" class="table table-borderless table-data table-hide-last-column">
                      <thead>
                        <tr>
                          <th>Name &amp; date recorded</th>
                          <th>Available Till</th>
                          <th>Recording Type</th>
                          <th>&nbsp;</th>
                        </tr>
                      </thead>
                      <tbody v-for="record in recordingList.data" :key="record.id">
                        <tr :class="{'tr-has-expandable': record.status === 'Processed'}">
                          <td>
                            <span class="recording-name">
                                {{ recordName(record) }}
                            </span>
                            <span class="recording-date">{{ record.created_at | moment('DD/MM/YYYY HH:mm')}}</span>
                          </td>
                          <td>
                              <span v-if="record.will_be_deleted_at">
                                {{ record.will_be_deleted_at | moment('DD/MM/YYYY HH:mm') }}
                              </span>

                              <small v-if="record.status === 'Processed' && !record.will_be_deleted_at">
                                Permanent storage
                              </small>
                          </td>
                          <td>
                            <div v-if="record.status === 'Processed'">
                              <img alt="" src="@/assets/img/icons/icon-download.svg" />
                              <b class="ml-1">
                                {{ record.mp4 ? 'video' : '' }}{{ (record.mp4 && record.mp3) ? ', ': '' }}
                                {{ record.mp3 ? 'audio' : '' }}
                              </b>
                            </div>
                            <div v-else>
                              <span class="fa fa-cog fa-spin"></span>
                              <small class="ml-2">{{ record.status }}...</small>
                            </div>
                          </td>
                          <td>
                            <button v-if="record.status === 'Processed'" type="button" class="td-expand" data-trigger="td-expand"><i class="fas fa-chevron-down"></i></button>
                          </td>
                        </tr>
                        <tr>
                          <td colspan="4" v-if="record.status === 'Processed'">
                            <div class="tr-expandable-content">
                              <div class="recording-details">
                                <div class="row align-items-center">
                                  <div class="col-lg order-last order-lg-first">
                                    <div class="name">{{ record.meeting ? record.meeting.subject : '' }}</div>
                                    <div class="meta">
                                      <!--
                                      <div>Date recorded: <span>{{ record.created_at | moment('DD/MM/YYYY HH:mm') }}</span></div>
                                      -->
                                      <div>Length: <span>{{ convertDuration(record.length_in_seconds) }}</span></div>
                                      <div>Storage: <span>{{ calcUsage(record) }}</span></div>
                                    </div>
                                    <div class="actions">
                                      <a href="#" class="btn btn-white" @click.prevent="confirmDelete(record)"><img alt="" src="@/assets/img/icons/icon-trash.svg" /></a>

                                      <a
                                        v-if="record.mp4"
                                        class="btn btn-white"
                                        :href="record.mp4"
                                        download
                                        target='_blank'
                                      >
                                        Download video
                                      </a>

                                      <a
                                        v-if="record.mp3"
                                        class="btn btn-white"
                                        :href="record.mp3"
                                        download
                                        target='_blank'
                                      >
                                        Download audio
                                      </a>

                                      <a href="#" class="btn btn-white" @click.prevent="openRecording(record)">Play</a>

                                      <div v-if="!record.mp3" class="mt-1">
                                        <span class="fa fa-cog fa-spin"></span>
                                        Audio version is being processed...
                                      </div>
                                    </div>
                                  </div>
                                  <!--
                                  <div class="col-md flex-lg-grow-0 mb-1 mb-lg-0" v-if="record.mp3">
                                    <div class="recording-thumbnail">
                                      <i class="fas fa-music"/>
                                    </div>
                                  </div>
                                  <div class="col-md flex-lg-grow-0 mb-1 mb-lg-0" v-if="record.mp4">
                                    <div class="recording-thumbnail">
                                      <i class="fas fa-video"/>
                                    </div>
                                  </div>
                                  -->
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>  
                  <div class="row" v-if="recordingList.last_page > 1">
                    <div class="col-12 p-3">
                      <label class="float-right font-weight-bold m-2">
                        {{ recordingList.total }} item{{ recordingList.total > 1 ? 's' : '' }},
                        {{ recordingList.last_page }} page{{ recordingList.last_page > 1 ? 's' : '' }}
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
                          :disabled="curPage === recordingList.last_page" 
                          @click.prevent="go(curPage+1)">
                        </button>
                        <button 
                          class="btn btn-outline fas fa-step-forward"
                          :disabled="curPage === recordingList.last_page" 
                          @click.prevent="go(recordingList.last_page)">
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          <div class="col-xl mt-2 mt-xl-0" v-if="isShowGotcha">
            <gotcha :tip-list="tipList" @close="isShowGotcha = false"></gotcha>
          </div>
        </div>
      </div>
    </section>
    <confirm-delete-recording 
      v-if="isShowConfirmDeleteRecording"
      :title="curTitle"
      :content="curContent"
      @close="isShowConfirmDeleteRecording = false"
      @delete="deleteRecording">
    </confirm-delete-recording>
    <audio-player 
      v-if="isShowAudioPlay"
      :record="selRecord"
      :record-name="recordName(selRecord)"
      @close="isShowAudioPlay = false"
      ></audio-player>
  </main>
</template>
<script>
import Gotcha from '@/components/Gotcha'
import ConfirmDeleteRecording from '@/components/ConfirmDeleteRecording'
import AudioPlayer from '@/components/AudioPlayer'
import {mapState} from 'vuex'
export default {
  components: {
    Gotcha,
    ConfirmDeleteRecording,
    AudioPlayer,
  },
  computed: {
    ...mapState({
      recordingList: state => state.meeting.recordings,
      recordingsStorage: state => state.meeting.recordings_storage,
    }),
    activeStorageAddon() {
        return this.recordingsStorage ? this.recordingsStorage.active_storage_addon : null;
    },
    totalStorageGb() {
      let bytes = this.recordingsStorage ? this.recordingsStorage.total_bytes : 0;
      return (bytes / 1000000000).toFixed(2);
    },
    freeStorageGb() {
      let bytes = this.recordingsStorage ? this.recordingsStorage.free_bytes : 0;
      return (bytes / 1000000000).toFixed(2);
    },
    hasFixedGbsPlan() {
      return this.recordingsStorage ? this.recordingsStorage.has_fixed_gbs_plan : null;
    },
  },
  data() {
    return {
      isShowGotcha: true,
      tipList: [
        "You will find your recorded meetings here",
        "You can choose storage plans that will persist recordings for 24 hours or forever",
      ],
      isShowConfirmDeleteRecording: false,
      curTitle: '',
      isShowAudioPlay: false,
      selRecord: {},
      curContent: 'This recording will be deleted immediately.<br/>You can’t undo this action.',
      storageFetched: false,
      curPage: ''
    }
  },
  created() {
    this.$store.dispatch('setLoadingStatus', 'loading');
    this.$store.dispatch('getRecordingsStorage').then(() => {
      this.storageFetched = true;
      this.$store.dispatch('getRecordings', '');
    });
  },
  updated() {
    this.initTable()
  },
  watch: {
    recordingList(val) {
      this.curPage = val.current_page
    }
  },
  methods: {
    recordName(recording) {

      if (recording.meeting) {
        return recording.meeting.subject;
      }

      if (recording.meeting_room) {
        return 'Room ' + recording.meeting_room.webrtc.alias;
      }

      return '';
    },
    confirmDelete(curRecord) {
      this.curTitle = 'Are you sure you want to delete ' + this.recordName(curRecord) + ' recording?'
      this.selRecord = curRecord
      this.isShowConfirmDeleteRecording = true
    },
    initTable() {
      var element = document.querySelectorAll('.tr-has-expandable');

      for (var i = 0; i < element.length; i++) {
        element[i].onclick = function (e) {
          var that = this;
          // eslint-disable-next-line
          if ($(that.querySelector('.td-expand')).is(e.target) || $(that.querySelector('.td-expand')).has(e.target).length > 0) {
            if (!that.classList.contains('is-expanded')) {
              that.querySelector('.td-expand').children[0].classList.remove('fa-chevron-down');
              that.querySelector('.td-expand').children[0].classList.add('fa-chevron-up');
              that.classList.add('is-expanded');
              that.nextElementSibling.children[0].children[0].style.maxHeight = that.nextElementSibling.children[0].children[0].scrollHeight + 'px';
            } else {
              that.querySelector('.td-expand').children[0].classList.remove('fa-chevron-up');
              that.querySelector('.td-expand').children[0].classList.add('fa-chevron-down');
              that.classList.remove('is-expanded');
              that.nextElementSibling.children[0].children[0].style.maxHeight = '';
            }
          }
        }
      }
    },
    convertDuration(seconds) {
      // return this.$moment().duration(seconds, 'seconds');
      return this.$moment().startOf('day').seconds(seconds).format('H:mm:ss')
    },
    calcUsage(curRecord) {

      let storage = 'video ' + this.bytesToMb(curRecord.video_size_in_bytes) + 'MB';

      if (curRecord.audio_size_in_bytes) {
        storage += ', audio ' + this.bytesToMb(curRecord.audio_size_in_bytes) + 'MB';
      }

      return storage;
      // let duration = curRecord.length_in_seconds;
      // let percent = duration > 0 ? curRecord.length_in_seconds * 100 / duration : 0
      // return percent.toFixed(1)
    },
    bytesToMb(bytes) {
      return parseFloat(bytes / 1000000).toFixed(2);
    },
    openRecording(curRecord) {
      this.selRecord = curRecord
      this.isShowAudioPlay = true
    },
    deleteRecording() {
      this.$store.dispatch('deleteRecording', this.selRecord.id)
        .then(() => {
            this.$toast.success("Deleted successfully!")
        })
        .catch(err => {
            this.$toast.error(err)
        })   
    },
    go(pageNum) {
      this.$store.dispatch('getRecordings', pageNum);
    }
  },
}
</script>