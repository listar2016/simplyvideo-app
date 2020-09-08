<template>
  <div>
    <div class="h-100" v-show="!connected"><!-- v-show wont work on <testing> directly because it has d-flex class internally -->
      <testing
        v-on:testing-complete="onTestingComplete"
        v-on:continue-connect-with-pin="continueConnectWithPin"
        :call-type="callType"
        :previous-route="previousRoute"
        :is-connecting="isConnecting"
        :retry-connecting="retryConnecting"
        :show-pin-input="showPinInput"
        :invalid-pin="invalidPin"
      ></testing>
    </div>

    <div v-show="connected" class="meeting-cover">
      <div class="meeting-container">
        <meeting-side-bar
            :participants="participants"
            :host="isHost"
            :recording-participant-name="recordingParticipantName"
            :selected-participant-uuid="selectedParticipantUuid"
            :is-host="isHost"
            :chat-messages="chatMessages"
            :my-uuid="myUuid"
            :mute-status="muteStatus"
            v-on:select-participant="selectParticipant"
            v-on:toggle-participant-mute="toggleParticipantMute"
            v-on:disconnect-participant="disconnectParticipant"
            v-on:stop-recording="stopRecording"
            v-on:send-chat-message="sendChatMessage"
            v-on:set-participant-to-host="setParticipantToHost"
            v-on:set-participant-to-guest="setParticipantToGuest"
            v-on:unlock-participant="unlockParticipant"
            @muteAll="muteAll"
            @disconnectAll="disconnectAllParticipants" 
            v-if="isShowSidebar"
        ></meeting-side-bar>

        <div class="meeting-screen">
          <div class="meeting-header">
            <div class="header-left">
              <div class="btn-cover">
                <div class="meeting-action" @click.prevent="toggleSidebar">
                  <img v-if="isShowSidebar" src="@/assets/img/icons/ic_hide_sidebar.svg" />
                  <img v-else src="@/assets/img/icons/ic_show_sidebar.svg" />
                </div>

                <div>
                  <div
                          class="meeting-action"
                          :class="{'bg-white': isShowSettings}"
                  >
                    <!--
                    @click.prevent="isShowSettings = !isShowSettings"
                    -->
                    <img v-if="isShowSettings" src="@/assets/img/icons/ic_settings_lg_hover.svg" />
                    <img v-else src="@/assets/img/icons/ic_settings_lg.svg" />
                  </div>
                  <settings
                          v-if="isShowSettings"
                          :preselected-camera-device-id="selectedCameraDeviceId"
                          :preselected-microphone-device-id="selectedMicrophoneDeviceId"
                          style="z-index:9999;margin-top:1rem;">
                  </settings>
                </div>
              </div>

              <div class="meeting-title">
                <h6>Room {{ webrtcAlias }}<small class="ml-2" v-if="freePlan">Time Left: {{ remainDuration }}</small></h6>
                <p v-if="meetingDuration">Meeting duration: {{ meetingDuration }}</p>
              </div>
            </div>

            <div class="header-right">
              <!--
              <div
                class="meeting-avata"
                v-for="avata in avataList"
                :key="avata.id"
                :class="{'active': avata.is_selected}"
                :style="`background-image: url('/img/${avata.url}`"
                v-tooltip="{'content': getAvataStatus(avata)}"
                @click="avata.is_selected = !avata.is_selected">
                <div v-if="avata.status===1" class="mic-status active">
                  <img src="@/assets/img/icons/ic_mic_small.svg" />
                </div>
                <div v-else-if="avata.status===2" class="mic-status inactive">
                  <img src="@/assets/img/icons/ic_mic_small_white.svg" />
                </div>
                <div v-else-if="avata.status===3" class="mic-status disable">
                  <img src="@/assets/img/icons/ic_mic_small_disable_white.svg" />
                </div>
              </div>
              <div class="action-divider"></div>
              -->
              <div v-if="isHost" class="meeting-action-dropdown">
                  <div
                    class="meeting-action"
                    :class="{'bg-white': isShowSendInvite}"
                    @click.prevent="isShowSendInvite =! isShowSendInvite">
                      <img v-if="isShowSendInvite" src="@/assets/img/icons/ic_plus_hover.svg" />
                      <img v-else src="@/assets/img/icons/ic_plus.svg" />
                  </div>
                  <send-invite
                      v-if="isShowSendInvite"
                      :webrtc-alias="webrtcAlias"
                      style="margin-top:1rem;z-index:9999;">
                  </send-invite>
              </div>
            </div>
          </div>

          <div class="meeting-content position-relative">
            <video 
              id="video" 
              src="" 
              class="w-100 position-absolute" 
              v-show="isIncomingVideoSupportedByCallType">
            </video>
            <video 
              id="screen-video" 
              src="" 
              class="w-100 position-absolute" 
              style="z-index:10;" v-show="isScreenStream"></video>

            <div v-show="!isIncomingVideoSupportedByCallType">
                <div class="h-100 text-white d-flex align-items-center justify-content-center">
                    <h3>
                        Audio only
                    </h3>
                </div>
            </div>
          </div>

          <div class="meeting-footer">
            <div class="footer-body">
              <toggle-mic
                      :allowed="actions.microphone.allowed"
                      :enabled="actions.microphone.enabled"
                      @toggle="toggleMyAudio"
              />

              <toggle-video
                      :allowed="actions.camera.allowed"
                      :enabled="actions.camera.enabled"
                      @toggle="toggleMyVideo"
              />

              <screen-share
                      :enabled="actions.screenShare.enabled"
                      @toggle="toggleScreenShare"
              />

              <!--
              <div
                class="meeting-action bg-white"
                v-tooltip="statusVolumn ? 'Mute' : 'Unmute'"
                @click="statusVolumn = !statusVolumn">
                  <img v-if="statusVolumn" src="@/assets/img/icons/ic_audio.svg" />
                  <img v-else src="@/assets/img/icons/ic_audio_disable.svg" />
              </div>
              -->
              <div class="action-divider"></div>
              <!--
              <div
                class="meeting-action"
                v-tooltip="isMaximize ? 'Show minimize' : 'Show maximize'"
                @click="isMaximize = !isMaximize">
                  <img v-if="isMaximize" src="@/assets/img/icons/ic_minimize.svg" />
                  <img v-else src="@/assets/img/icons/ic_full_screen.svg" />
              </div>
              <div
                class="meeting-action"
                v-tooltip="'Create poll'">
                  <img src="@/assets/img/icons/ic_poll.svg" />
              </div>
              -->
              <div
                v-if="isHost"
                class="meeting-action"
                v-tooltip="recordingTooltip()"
                @click="isRecording ? stopRecording() : startRecording()">
                  <img v-if="isRecording" src="@/assets/img/icons/ic_recording_stop.svg" />
                  <img v-else src="@/assets/img/icons/ic_record.svg" class="w-50"/>
              </div>
              <div
                v-if="isHost"
                class="meeting-action position-relative"
                v-tooltip="isLocked ? 'Unlock meeting' : 'Lock meeting'"
                @click="toggleMeetingLock"
                >
                <img v-if="isLocked" class="position-absolute" style="width:70%;" src="@/assets/img/icons/red_line.svg"/>
                <img style="width:40%;" src="@/assets/img/icons/ic_locked_meeting_white.svg"/>
              </div>
              <div
                class="meeting-action"
                v-tooltip="isKeyPad ? 'Hide Keypad' : 'Show Keypad'"
                @click="isKeyPad = !isKeyPad">
                  <img src="@/assets/img/icons/ic_dial_white.svg" class="w-50"/>
             </div>
              <keypad
                v-if="isKeyPad"
                @sendDTMF="sendDTMF"
              ></keypad>
              <!--
              <div
                class="meeting-action"
                @click.prevent="isShowAdditionalOptions = !isShowAdditionalOptions"
                v-tooltip="'Additional options'"
                :class="{'bg-white': isShowAdditionalOptions}">
                  <img v-if="isShowAdditionalOptions" src="@/assets/img/icons/ic_meeting_more-horizontal_active.svg" />
                  <img v-else src="@/assets/img/icons/ic_meeting_more-horizontal.svg" />
              </div>
              -->
              <div class="action-divider"></div>
              <div
                class="meeting-action bg-danger"
                @click.prevent="disconnectMe"
                @mouseenter="isHoverEndCall = true"
                @mouseleave="isHoverEndCall = false">
                <img v-if="isHoverEndCall" src="@/assets/img/icons/ic_end_call_hover.svg" />
                <img v-else src="@/assets/img/icons/ic_end_call.svg" />
              </div>
            </div>
          </div>

          <!--
          <div class="meeting-footer-corner">
            <div class="meeting-action">
              <a href="#"><img src="@/assets/img/icons/ic_raise_hand.svg" /></a>
            </div>
          </div>
          -->

          <additional-options v-if="isShowAdditionalOptions"></additional-options>
          <self-view 
            v-if="callType === 'video' && actions.camera.enabled" 
            :is-screen-share="actions.screenShare.enabled"
            :video-stream="shareStream"/>
        </div>
      </div>
    </div>
    <confirm-dialog
      v-if="isShowDisconnectConfirm"
      :title="confirmData.title"
      :description="confirmData.description"
      @no="isShowDisconnectConfirm = false"
      @yes="yesConfirm">
    </confirm-dialog>
  </div>
</template>

<script>
  import ToggleVideo from '@/components/call/actions/ToggleVideo.vue';
  import ToggleMic from '@/components/call/actions/ToggleMic';
  import ScreenShare from '@/components/call/actions/ScreenShare'
  import SelfView from '@/components/call/SelfView'
  import MeetingSideBar from '@/components/MeetingSideBar'
  import Settings from '@/components/Settings'
  import SendInvite from '@/components/SendInvite'
  import AdditionalOptions from '@/components/AdditionalOptions'
  import Testing from "../JoinMeeting/WebRTC/Testing";
  import Keypad from '@/components/Keypad'
  import ConfirmDialog from '@/components/ConfirmDialog'
  import Vue from "vue";
  import axios from 'axios';
  import {mapState} from "vuex";

  export default {
    components: {
      Testing,
      MeetingSideBar,
      Settings,
      SendInvite,
      AdditionalOptions,
      SelfView,
      ToggleMic,
      ToggleVideo,
      Keypad,
      ScreenShare,
      ConfirmDialog
    },

    props: {
      meetingRoomId: Number,
      meetingId: Number,
      webrtcAlias: String,
      displayName: String,
      callType: String,
      retryConnecting: Boolean, // Set this to true for instant meeting rooms and false for others
      conferencingNode: String,
      previousRoute: Object,
      preloadedHostPin: String,
    },

    computed: {
      ...mapState({
          isLoggedIn: state => !!state.auth.token,
      })
    },
    mounted() {


      this.isShowSidebar = screen.width >= 576
      if (!this.webrtcAlias) {
        let routeName = this.isLoggedIn ? 'dashboard' : 'join-meeting';
        this.$router.push({name: routeName});
      }

      this.$emit('enable-fullscreen')
      this.checkDeviceAvailability();
      this.checkFeatureAvailability();
    },
    created() {
      window.addEventListener('beforeunload', this.closeBrowser)
    },
    beforeDestroy() {
      window.addEventListener('beforeunload', this.closeBrowser)
    },
    destroyed() {
      if (this.updateMeetingDurationInterval) {
          clearInterval(this.updateMeetingDurationInterval);
      }
      if (this.updateRemainDurationInterval) {
        clearInterval(this.updateRemainDurationInterval);
      }
      this.closeBrowser();
    }, 

    data() {
      return {
          isShowSettings: false,
          isShowSendInvite: false,
          isShowAdditionalOptions: false,

          statusMic: false,
          statusScreen: false,
          statusCamera: false,
          statusVolumn: false,

          isShowSidebar: true,
          isHoverEndCall: false,
          isMaximize: false,
          isRecording: false,
          isKeyPad: false,

          isRecordingAvailable: false,
          isRecordingAvailableMessage: '',

          isLocked: false,

          actions: {
              microphone: {
                  allowed: false,
                  enabled: false
              },

              camera: {
                  allowed: false,
                  enabled: false
              },

              screenShare: {
                  enabled: false
              }
          },

          selectedCameraDeviceId: null,
          selectedMicrophoneDeviceId: null,

          chatMessages: [],
          meetingDuration: '',
          updateMeetingDurationInterval: null,
          updateRemainDurationInterval: null,

          isTesting: true,
          pexip: null,
          pin: this.preloadedHostPin ? this.preloadedHostPin : '',
          showPinInput: false,
          invalidPin: false,
          isConnecting: false,
          connected: false,
          myUuid: null,
          participants: [],
          selectedParticipantUuid: '',
          recordingParticipantName: '',
          isHost: false,

          isCameraAllowedByBrowser: false,
          isMicrophoneAllowedByBrowser: false,

          isAudioLocallyMuted: false,
          isVideoLocallyMuted: false,

          isIncomingAudioSupportedByCallType: false,
          isOutgoingAudioSupportedByCallType: false,
          isIncomingVideoSupportedByCallType: false,
          isOutgoingVideoSupportedByCallType: false,

          // Instant meeting rooms are not available immediately after they're
          // created. It can take up to 30s to reach them. So we will retry this operation
          // a few times
          connectionAttempts: 0,

          conferenceId: '',
          remainTime: -1,
          freePlan: false,
          remainDuration: '',
          muteStatus: false,
          shareStream: '',
          isScreenStream: false,
          isShowDisconnectConfirm: false,
          confirmData: {
            title: '',
            description: '',
            callbackType: 0,
            attachData: ''
          }
      };
    },
    methods: {
      checkDeviceAvailability() {

      },

      onTestingComplete(data) {
        this.isTesting = false;
        this.selectedCameraDeviceId = data.selectedCameraDeviceId;
        this.selectedMicrophoneDeviceId = data.selectedMicrophoneDeviceId;
        this.isMicrophoneAllowedByBrowser = data.isMicrophoneAllowedByBrowser;
        this.isCameraAllowedByBrowser = data.isCameraAllowedByBrowser;

        console.log('Testing complete!');
        this.makeCall();
        this.setActionStatuses(data);
      },

      setActionStatuses(data) {
        const mAllowed = data.isMicrophoneAllowedByBrowser;
        const mEnabled = data.isMicrophoneAllowedByUser;

        this.actions.microphone = {
          allowed: mAllowed,
          enabled: mEnabled
        };

        let mMute = mAllowed ? !mEnabled : true;
        this.pexip.muteAudio(mMute);

        const cAllowed = data.isCameraAllowedByBrowser;
        const cEnabled = data.isCameraAllowedByUser;

        this.actions.camera = {
          allowed: cAllowed,
          enabled: cEnabled
        };

        let cMute = cAllowed ? !cEnabled : true;
        this.pexip.muteVideo(cMute);
      },

      toggleMyAudio() {
        let value = this.actions.microphone.enabled;

        this.pexip.muteAudio(value);
        this.actions.microphone.enabled = !value;
      },

      toggleMyVideo() {
        let value = this.actions.camera.enabled;

        this.pexip.muteVideo(value);
        this.actions.camera.enabled = !value;
      },

      toggleScreenShare() {
        let value = this.actions.screenShare.enabled;
        if (value) {
          this.pexip.present("")
        } else {
          this.pexip.present("screen")
        }
      },

      toggleSidebar() {
        this.isShowSidebar = !this.isShowSidebar
      },

      makeCall() {
        this.isTesting = false;
        this.setIncomingAndOutgoingMedia();
        this.isConnecting = true;

        this.initiatePexip();
        this.pexip.makeCall(
                this.conferencingNode,
                this.webrtcAlias,
                this.displayName,
                null, // bandwidth
                this.callType
        );

      },

      setIncomingAndOutgoingMedia() {
        if (this.callType === 'video') {
          this.isOutgoingAudioSupportedByCallType = true;
          this.isIncomingAudioSupportedByCallType = true;
          this.isOutgoingVideoSupportedByCallType = true;
          this.isIncomingVideoSupportedByCallType = true;
        }

        if (this.callType === 'audioonly') {
          this.isOutgoingAudioSupportedByCallType = true;
          this.isIncomingAudioSupportedByCallType = true;
          this.isOutgoingVideoSupportedByCallType = false;
          this.isIncomingVideoSupportedByCallType = false;
        }

        if (!this.isCameraAllowedByBrowser) {
          this.isOutgoingVideoSupportedByCallType = false;
        }
      },

      initiatePexip() {
        // eslint-disable-next-line
        this.pexip = new PexRTC();
        this.pexip.onSetup = this.onSetup;
        this.pexip.onConnect = this.onConnect;
        this.pexip.onDisconnect = this.onDisconnect;
        this.pexip.onConferenceUpdate = this.onConferenceUpdate;
        this.pexip.onParticipantCreate = this.onParticipantCreate;
        this.pexip.onParticipantUpdate = this.onParticipantUpdate;
        this.pexip.onParticipantDelete = this.onParticipantDelete;
        this.pexip.onRosterList = this.onRosterList;
        this.pexip.onChatMessage = this.onChatMessage;
        this.pexip.onError = this.onError;

        this.pexip.onScreenshareConnected = this.onScreenshareConnected
        this.pexip.onScreenshareStopped = this.onScreenshareStopped
        this.pexip.onPresentation = this.onPresentation
        this.pexip.onPresentationConnected = this.onPresentationConnected
        this.pexip.onPresentationDisconnected = this.onPresentationDisconnected

        if (this.isOutgoingVideoSupportedByCallType) {
          this.pexip.video_source = this.selectedCameraDeviceId;
          // https://docs.pexip.com/api_client/api_pexrtc.htm
          // null: default sources
          // false: do not request
        } else {
          this.pexip.video_source = false;
        }
      },

      onSetup(stream, pinStatus, conferenceExtension) {
        console.log('onSetup', stream, pinStatus, conferenceExtension);
        if (pinStatus === 'required' && !this.pin.length) {
          this.askPin();
        } else {
          this.pexip.connect(this.pin);
        }
      },

      askPin() {
        this.isConnecting = false;
        this.showPinInput = true;
      },

      continueConnectWithPin(pin) {
        this.pin = pin;
        this.showPinInput = false;
        this.makeCall();
      },

      onConnect(stream) {
        this.isConnecting = false;
        this.connected = true;
        this.pin = '';
        this.myUuid = this.pexip.uuid;
        this.isHost = this.pexip.role === 'HOST';

        let video = document.getElementById('video');
        video.srcObject = stream;
        video.play();
        this.videoStream = stream

        this.updateMeetingDurationInterval = setInterval(() => {
            this.updateMeetingDuration();
        }, 500)

        this.getRemainTime()
      },

      disconnectMe() {
        this.confirmData.title = "Are you sure want to end the call?"
        this.confirmData.callbackType = 1
        this.isShowDisconnectConfirm = true
      },
      realDisconnectMe() {
        this.pexip.disconnect();
        this.participants = [];
        this.connected = false;
        if (this.isLoggedIn) {
          this.$router.push({
            name: 'dashboard',
            params: {
              reloadRequired: true, // Otherwise Pexip doesn't release camera/mic and the light stays on
            }
          });
        } else {
          // this.$router.push({
          //   name: 'welcome-guest', params: {
          //     webrtcAlias: this.webrtcAlias
          //   }
          // });
          this.redirectToAfterCallPage()
        }
      },

      disconnectParticipant(participant) {
        this.confirmData.title = "Are you sure want to disconnect current participant?"
        this.confirmData.callbackType = 2
        this.confirmData.attachData = participant
        this.isShowDisconnectConfirm = true
      },
      realDisconnectParticipant(){
        let participant = this.confirmData.attachData
        if (participant.uuid === this.myUuid) {
          this.realDisconnectMe();
          return;
        }

        this.pexip.disconnectParticipant(participant.uuid);
      },

      unlockParticipant(participant) {
        console.log('Unlocking ', participant.uuid);
        this.pexip.unlockParticipant(participant.uuid);
      },

      toggleParticipantMute(participant) {
        let muted = !(participant.is_muted === 'YES');
        this.pexip.setParticipantMute(participant.uuid, muted);
      },

      setParticipantToHost(participant) {
        this.pexip.setRole(participant.uuid, 'chair');
      },

      setParticipantToGuest(participant) {
        this.pexip.setRole(participant.uuid, 'guest');
      },

      onChatMessage(message) {
        this.chatMessages.push({
          id: this.$moment().format('x'),
          time: this.$moment().format('HH:mm'),
          name: message.origin,
          message: message.type === 'text/plain' ? message.payload : message.type,
        });
      },

      sendChatMessage(messageText) {

        this.pexip.sendChatMessage(messageText);

        this.chatMessages.push({
            id: this.$moment().format('x'),
            time: this.$moment().format('HH:mm'),
            name: this.displayName,
            message: messageText,
        });
      },

      onRosterList(participants) {
        this.participants = participants;
      },

      onParticipantCreate(participant) {
        this.participants.push(participant);
      },

      onParticipantUpdate(updatedParticipant) {
        let index = this.participants.findIndex((participant) => {
          return participant.uuid === updatedParticipant.uuid;
        });

        if (index === -1) {
          this.onParticipantCreate(updatedParticipant);
          return;
        }

        this.$set(this.participants, index, updatedParticipant);
        if (updatedParticipant.uuid === this.myUuid) {
          this.isHost = updatedParticipant.role === 'chair'
        }
      },

      onParticipantDelete(deletedParticipant) {
        let index = this.participants.findIndex((participant) => {
          return participant.uuid === deletedParticipant.uuid;
        });

        this.participants.splice(index, 1);
      },

      selectParticipant(participant) {

        if (!this.isHost) {
            return;
        }

        if (participant.uuid === this.selectedParticipantUuid) {
          // Deselect
          this.selectedParticipantUuid = '';
          return;
        }

        console.log(participant);
        this.selectedParticipantUuid = participant.uuid;
      },

      redirectBack(error) {

        let params = Vue.util.extend({}, this.previousRoute.params);
        params.error = error;

        this.$router.push({
          name: this.previousRoute.name,
          params: params,
        });
      },

      recordingTooltip() {

        if (!this.isLoggedIn) {
          return 'Recording is available for registered users';
        }

        if (!this.isRecordingAvailable) {
          return this.isRecordingAvailableMessage;
        }

        return this.isRecording ? 'Stop recording' : 'Start recording';
      },

      // Recorder gets added as another participant
      // Instead of talking/listening like normal human would,
      // it will record the stream and send it to S3
      startRecording() {

        if (!this.isRecordingAvailable){
          return false;
        }

        console.log('startRecording');

        let url = '/recordings';
        let payload = {
            meeting_room_id: this.meetingRoomId, // required
            meeting_id: this.meetingId, // optional
        };

        axios({ url: url, data: payload, method: 'POST' })
          .then(response => {
            let rtmp = response.data.rtmp;
            let recordingParticipantName = response.data.recording_participant_name;
            this.recordingParticipantName = recordingParticipantName;
            this.pexip.dialOut(rtmp, 'rtmp', "guest");
            this.isRecording = true;
          })
          .catch(err => {
            console.log(err);
          });
      },

      stopRecording() {

        if (!this.isRecordingAvailable){
          return false;
        }
        console.log('stopRecording');

        this.participants.forEach((participant) => {
            if (participant.display_name === this.recordingParticipantName) {
                this.pexip.disconnectParticipant(participant.uuid);
            }
        });

        this.isRecording = false;
      },

      toggleMeetingLock() {
        this.pexip.setConferenceLock(!this.isLocked);
        this.isLocked = !this.isLocked;
      },

      onConferenceUpdate(properties) {
          console.log('CONFERENCE UPDATE', properties);
          this.isLocked = properties.locked;
      },

      checkFeatureAvailability() {

        if (this.isLoggedIn) {
          axios({url: '/profile', method: 'GET'})
            .then(resp => {
              let userProfile = resp.data;
              this.isRecordingAvailable = userProfile.is_recording_available;
              this.isRecordingAvailableMessage = userProfile.is_recording_available_message;
            })
            .catch(err => {
              console.log(err);
            });
        }

      },

      updateMeetingDuration(){

          // @TODO there's a bug - if oldest participant disconnects, then time is updated...

          // let oldestParticipant = null;
          let oldestParticipantStartTime = 0;

          this.participants.forEach((participant) => {

              if (!oldestParticipantStartTime || (participant.start_time < oldestParticipantStartTime)) {
                  oldestParticipantStartTime = participant.start_time;
              }
          });

          if (oldestParticipantStartTime) {
              let now = Math.round((new Date()).getTime() / 1000);
              let seconds = Math.round(now - oldestParticipantStartTime);

              let fullMinutes = Math.floor(seconds / 60);
              let remainderSeconds = Math.round(seconds % 60);
              let formatted = fullMinutes + ':' + remainderSeconds.toString().padStart(2, '0');

              this.meetingDuration = formatted;
          }
      },

      onError(error) {

        // Instant meeting rooms are not available immediately after they're
        // created. It can take up to 30s to reach them. So we will retry this operation
        // a few times
        let notFound = error.indexOf('Neither conference nor gateway found') !== -1;
        let gatewayFailed = error.indexOf('Gateway dial out failed') !== -1;

        if ((notFound || gatewayFailed) && this.retryConnecting && this.connectionAttempts <= 15) {
          console.log('Trying the call again!');
          setTimeout(this.makeCall, 4000);
          this.connectionAttempts++;
          return;
        }

        this.isConnecting = false;
        if (error.indexOf('Invalid PIN') !== -1) {
          this.showPinInput = true;
          this.invalidPin = true;
          this.pin = '';
        } else {
          this.redirectBack(error);
        }
      },

      onDisconnect(msg) {
        let callRejected = msg.indexOf('Call rejected') !== -1;
        let gatewayFailed = msg.indexOf('Gateway dial out failed') !== -1;
        if ((callRejected || gatewayFailed) && this.retryConnecting && this.connectionAttempts <= 15) {
          console.log('Trying the call again!');
          setTimeout(this.makeCall, 4000);
          this.connectionAttempts++;
          return;
        }

        this.isConnecting = false;
        if (this.isLoggedIn) {
          this.redirectBack(msg);
        } else {
          this.redirectToAfterCallPage()
        }
      },
      sendDTMF(digit) {
        this.pexip.sendDTMF(digit)
      },
      onScreenshareConnected(stream) {
        this.actions.screenShare.enabled = true
        this.shareStream = stream
        this.$toast.success('Screen sharing started!')
      },
      onScreenshareStopped(reason) {
        this.shareStream = ''
        console.log(reason)
        this.actions.screenShare.enabled = false
      },
      onPresentation(setting, presenter, uuid) {
        if (setting) {
          this.pexip.getPresentation()
          console.log(uuid)
        } else {
          console.log(uuid)
        }
      },
      onPresentationConnected(stream) {
        console.log(stream)
        let video = document.getElementById('screen-video')
        video.srcObject = stream
        video.play()
        this.isScreenStream = true
      },
      onPresentationDisconnected(reason) {
        this.$toast.error(reason)
        console.log(reason)
        this.isScreenStream = false
      },
      getRemainTime() {
        let url=`/time-limit?alias=${this.webrtcAlias}`
        axios({ url: url, method: 'GET' })
          .then(response => {
            if (response.data.is_active) {
              this.conferenceId = response.data.conference_id
              if (response.data.seconds_left === null) {
                this.freePlan = false
                this.remainTime = ''
              } else {
                this.freePlan= true
                this.remainTime = response.data.seconds_left
                this.remainTime--
                this.updateRemainDurationInterval = setInterval(() => {
                  this.updateRemainDuration();
                }, 1000)
              
              }
            } else {
              setTimeout(this.getRemainTime, 5000)
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      updateRemainDuration() {
        if (this.freePlan) {
          this.remainTime--
          if (this.remainTime<=0) {
            this.realDisconnectAllParticipants()
            if (this.updateRemainDurationInterval) {
              clearInterval(this.updateRemainDurationInterval)
            }
          } else {
            let remainMinutes = Math.floor(this.remainTime / 60)
            let remainSeconds = Math.round(this.remainTime % 60)
            this.remainDuration = remainMinutes + ':' + remainSeconds.toString().padStart(2, '0');
          }
        }
      },
      disconnectAllParticipants() {
        this.confirmData.title = "Are you sure want to disconnect all participant?"
        this.confirmData.callbackType = 3
        this.isShowDisconnectConfirm = true
      },
      realDisconnectAllParticipants() {
        console.log('Disconnect All')
        this.pexip.disconnectAll()
        let url = '/time-limit/disconnect'
        let param = {
          conference_id: this.conferenceId
        }
        axios({ url: url, data: param, method: 'POST' })
          .then(response => {
            console.log(response)
          })
          .catch(err => {
            console.log(err);
          });
      },
      muteAll() {
        this.muteStatus = !this.muteStatus
        this.participants.forEach((participant) => {
          this.pexip.setParticipantMute(participant.uuid, this.muteStatus)
        })
      },
      closeBrowser() {
        this.pexip.disconnect()
      },
      redirectToAfterCallPage() {
        this.$router.push({
          name: 'after-call',
          params: {
            reloadRequired: true, // Otherwise Pexip doesn't release camera/mic and the light stays on
          }
        })
      },
      yesConfirm() {
        this.isShowDisconnectConfirm = false
        switch (this.confirmData.callbackType) {
          case 1:
            this.realDisconnectMe()
            break
          case 2:
            this.realDisconnectParticipant()
            break
          case 3:
            this.realDisconnectAllParticipants()
            break
        }
      }
    }
  }
</script>


<style lang="scss" scoped>
  @import '~bootstrap/scss/functions';
  @import '~bootstrap/scss/variables';
  @import '~bootstrap/scss/mixins';

  .meeting-sidebar {
    overflow-y: auto;
  }

  .meeting-screen {
    display: flex;
    flex-direction: column;

    .item-self-view {
      @include media-breakpoint-down(sm) {
        // display: none;
        bottom: 70px;
      }
    }
  }

  .meeting-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;

    .footer-body {
      display: flex;
      align-items: center;
    }
  }

  .meeting-action-dropdown {
    position: relative;
  }

  .meeting-cover {
    min-height: 100vh;
    display: flex;
    height: 100%;
    overflow: hidden;
  }

  .meeting-content {
    display: flex;
    height: 100%;
    justify-content: center;

    video {
      flex: 1;
      max-height: 100%;
    }
  }

  .meeting-container {
    display: flex;
    height: 100%;
    flex: 1;
  }

  .meeting-header {
    display: flex;
    align-items: center;

    .header-left {
      display: flex;
      align-items: center;

      @include media-breakpoint-down(sm) {
        flex-direction: column;

        .meeting-title {
          margin: 0;
        }

        .btn-cover {
          margin: 0 auto 10px 0;
        }
      }

      .meeting-title p {
        margin: 0;
      }

      .btn-cover {
        display: flex;
      }
    }

    .header-right {
      @include media-breakpoint-down(sm) {
        align-self: flex-start;
      }
    }
  }
</style>
