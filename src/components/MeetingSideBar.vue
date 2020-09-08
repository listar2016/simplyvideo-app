<template>
  <div class="meeting-sidebar">
    <div class="meeting-brand p-3">
      <img style="max-height: 50px;" alt="Simply Video" :src="businessLogo" />
    </div>
    <div class="participants-container">
      <div class="participants-header">
        <div class="before-icon">
          <img src='@/assets/img/icons/ic_users.svg'/>
        </div>
        <div class="header-content">
          <span>Participants</span>
          <span>{{ participants.length ? participants.length : '' }}</span>
        </div>
        <div class="after-icon">
          <a v-if="isHost" @click="isShowParticipantsSettings = !isShowParticipantsSettings">
            <img src='@/assets/img/icons/ic_settings.svg' />
          </a>
        </div>
      </div>
      <div class="participants-content">
        <div
          class="one-participant"
          v-for="participant in participants"
          :key="participant.uuid"
          :class="{'active': participant.uuid === selectedParticipantUuid}"
          @click="$emit('select-participant', participant)">
          <div class="before-icon" v-if="false"> <!-- @TODO raise hand -->
            <img src='@/assets/img/icons/ic_raised_hand_c.svg'/>
          </div>
          <div class="content" :class="{'active': false}"> <!-- @TODO active raise hand? -->
            <span>
              {{ showParticipantName(participant) }}
              {{ participant.uuid === myUuid ? '(you)' : '' }}
              {{ participant.service_type === 'waiting_room' ? '(locked)' : '' }}
            </span>
          </div>
          <div v-if="participant.uuid === selectedParticipantUuid" class="after-icon text-right">
            <div v-if="isRecorder(participant)">
              <button class="btn btn-danger" @click="$emit('stop-recording')">
                  Stop recording
              </button>
            </div>
            <div v-else-if="host">

              <button v-if="participant.service_type === 'waiting_room'" class="btn btn-dark" style="margin-top:5px;" @click="$emit('unlock-participant', participant)">
                Unlock
              </button>
              <div v-else>
                <button v-if="isHost && participant.uuid !== myUuid" class="btn btn-dark" style="margin-top:5px;" @click="toggleParticipantRole(participant)">
                  Set to {{ isParticipantHost(participant) ? 'Guest' : 'Host' }}
                </button>
                <button v-if="isHost" class="btn btn-dark" style="margin-top:5px;" @click="$emit('disconnect-participant', participant)">
                  Disconnect
                </button>
                <button v-if="isHost" class="btn btn-danger" style="margin-top:5px;" @click="$emit('toggle-participant-mute', participant)">
                  {{ isParticipantMuted(participant) ? 'Unmute' : 'Mute' }}
                </button>
              </div>
            </div>
          </div>
          <div v-else class="after-icon">
            <span class="time"><small>{{ participantTimes[participant.uuid] || '' }}</small></span>
            <span v-if="isParticipantShared(participant)"> <!-- @TODO screenshare -->
              <img src="@/assets/img/icons/ic_screen_share_small.svg"/>
            </span>
            <span v-if="false"> <!-- @TODO video status -->
              <img v-if="false" src="@/assets/img/icons/ic_camera_small.svg"/>
              <img v-if="false" src="@/assets/img/icons/ic_camera_small_mute.svg"/>
              <!--
              <img v-if="false" src="@/assets/img/icons/ic_camera_small_inactive.svg"/>
              <img v-if="false" src="@/assets/img/icons/ic_camera_small_disable.svg"/>
              -->
            </span>
            <span v-if="true"> <!-- @TODO mic status -->
              <img v-if="isParticipantMuted(participant)" src="@/assets/img/icons/ic_mic_small_mute.svg"/>
              <img v-else src="@/assets/img/icons/ic_mic_small.svg"/>
              <!--
              <img v-if="false" src="@/assets/img/icons/ic_mic_small_inactive.svg"/>
              <img v-if="false" src="@/assets/img/icons/ic_mic_small_disable.svg"/>
              -->
            </span>
          </div>
        </div>
      </div>
      <div class="d-flex align-items-end" style="height: 50px;">
          <span class="p-2">
            {{ this.isHost ? 'You have Host privileges' : 'You are joined as Guest' }}
          </span>
      </div>
      <!--
      <div class="gradient-shadow"></div>
      <div class="participants-footer">
        <div class="before-icon">
          <button class="btn btn-outline-secondary">Settings</button>
        </div>
        <div class="after-icon">
          <button class="btn btn-dark">Invite</button>
            <button class="btn btn-danger">Mute all</button>
        </div>
      </div>
      -->
      <participants-settings 
        v-if="isShowParticipantsSettings"
        :mute-status="muteStatus"
        @muteAll="isShowParticipantsSettings = false;$emit('muteAll')"
        @disconnectAll="isShowParticipantsSettings = false;$emit('disconnectAll')">
      </participants-settings>
    </div>
    <div class="chat-container border-top border-grey">
      <div class="chat-header">
        <div class="before-icon">
          <img src='@/assets/img/icons/ic_speech_bubble.svg'/>
        </div>
        <div class="header-content">
          <span>Chatbox</span>
        </div>
        <div class="after-icon">
          <a @click.prevent="">
            <img src='@/assets/img/icons/ic_settings.svg' />
          </a>
        </div>
      </div>
      <div class="chat-content" ref="chatContent">
        <div v-if="!chatMessages.length">
          <small>There are no chat messages...</small>
        </div>
        <div
          class="one-chat"
          v-for="chat in chatMessages"
          :key="chat.id">
          <div class="chat-information">
            <span class="chat-name">{{ chat.name }}</span>
            <span class="dot"></span>
            <span>{{ chat.time }}</span>
          </div>
          <div class="content">
            <p v-html="chat.message"></p>
          </div>
        </div>
      </div>
      <div class="chat-footer border-top borer-grey">
        <form class="form-horizontal">
          <div class="form-group with-right-icon text-form-group">
            <textarea
              ref="chatMessage"
              placeholder="Type message here..."
              v-model="message"
              v-on:keydown.enter="sendChatMessage"
              class="form-control chat-message">
            </textarea>

            <button class="right-icon btn btn-sm btn-outline" @click.prevent="sendChatMessage">
              Send
            </button>
            <!--
            <a href="#" class="right-icon"><img src="@/assets/img/icons/ic_dots_hr.svg"/></a>
            -->
          </div>
        </form>
      </div>
      <chatbox-settings v-if="isShowChatboxSettings"></chatbox-settings>
    </div>

  </div>
</template>

<script>
import {mapState} from 'vuex'
import ParticipantsSettings from '@/components/ParticipantsSettings'
import ChatboxSettings from '@/components/ChatboxSettings'
export default {
  components: {
    ParticipantsSettings,
    ChatboxSettings
  },
  props: {
      participants: Array,
      selectedParticipantUuid: String,
      recordingParticipantName: String,
      host: Boolean,
      isHost: Boolean,
      chatMessages: Array,
      myUuid: String,
      muteStatus: Boolean,
  },
  computed: {
    ...mapState({
      auth: state => state.auth.user,
      businessLogo: state => state.auth.business_logo
    })
  },
  created() {
    this.updateParticipantTimesWithInterval();
  },
  destroyed() {
    if (this.participantTimesInterval) {
      window.clearInterval(this.participantTimesInterval);
    }
  },
  data() {
    return {
      participantTimesInterval: null,
      participantTimes: [],
      message: '',
      isShowParticipantsSettings: false,
      isShowChatboxSettings: false
    };
  },
  watch: {
    chatMessages() {
        window.setTimeout(() => {
            console.log('scrolling to bottom');
          this.$refs.chatContent.scrollTop = this.$refs.chatContent.scrollHeight
        }, 200)
    }
  },
  methods: {
    isParticipantHost(participant) {
      return participant.role === 'chair';
    },
    isParticipantMuted(participant) {
      return participant.is_muted === 'YES';
    },
    isParticipantShared(participant) {
      return participant.is_presenting === 'YES';
    },
    toggleParticipantRole(participant) {
        let event = this.isParticipantHost(participant) ? 'set-participant-to-guest' : 'set-participant-to-host';
        console.log(event);
        this.$emit(event, participant);
    },
    sendChatMessage() {
      if (this.message.trim().length) {
        this.$emit('send-chat-message', this.message);
        this.message = '';
      }
      this.message = '';
      this.$refs.chatMessage.blur();
    },
    updateParticipantTimesWithInterval() {
      this.participantTimesInterval = window.setInterval(() => {

        let updatedParticipantTimes = [];
        this.participants.forEach((participant) => {

          let now = Math.round((new Date()).getTime() / 1000);
          let seconds = Math.round(now - participant.start_time);

          let fullMinutes = Math.floor(seconds / 60);
          let remainderSeconds = Math.round(seconds % 60);
          let formatted = fullMinutes + ':' + remainderSeconds.toString().padStart(2, '0');

          updatedParticipantTimes[participant.uuid] = formatted;
        });

        this.participantTimes = updatedParticipantTimes;

      }, 500);
    },
    isRecorder(participant){
      return participant.display_name === this.recordingParticipantName;
    },
    showParticipantName(participant) {

      if (this.isRecorder(participant)) {
          return 'Recorder';
      }

      let displayName = participant.display_name;
      if (displayName.length>19) {
        return displayName.substring(0, 18) + "..."
      } else {
        return displayName
      }
    },
  }
}
</script>

<style lang="scss" scoped>
  .text-form-group {
    margin: 0 !important;
  }
</style>
