<template>
  <div class="settings">
    <!--
    <div class="form-group">
      <label>Name of this call</label>
      <div class="d-flex">
        <input type="text" placeholder="Meeting title" class="form-control"/>
        <button class="btn btn-outline-secondary btn-sm ml-1 my-1">Save</button>
      </div>
    </div>
    <div class="form-group">
      <label>Meeting type</label>
      <multiselect 
        v-model="curMeetingType" 
        track-by="id"
        placeholder="Meeting Type"
        :show-labels="false"
        :options="meetingTypeList">
        <template 
          slot="singleLabel" 
          slot-scope="props">
          <img :src="`/img/icons/${props.option.icon}`" class="mr-2"/>
          <span class="option__desc"><span class="option__title">{{ props.option.name }}</span></span>
        </template>
        <template slot="option" slot-scope="props">
          <img :src="`/img/icons/${props.option.icon}`" class="mr-2"/>
          <span class="option__desc"><span class="option__title">{{ props.option.name }}</span></span>
        </template>
      </multiselect>
    </div>
    <div class="form-group">
      <label>Host</label>
      <multiselect 
        v-model="curHost" 
        track-by="id"
        placeholder="Host"
        :show-labels="false"
        :options="hostList">
        <template 
          slot="singleLabel" 
          slot-scope="props">
          <img :src="`/img/icons/${props.option.icon}`" class="mr-2"/>
          <span class="option__desc"><span class="option__title">{{ props.option.name }}</span></span>
        </template>
        <template slot="option" slot-scope="props">
          <img :src="`/img/icons/${props.option.icon}`" class="mr-2"/>
          <span class="option__desc"><span class="option__title">{{ props.option.name }}</span></span>
        </template>
      </multiselect>
    </div>
    <hr/>
    -->
    <div class="form-group">
      <label>Microphone</label>
      <multiselect
        v-model="selectedMicrophone"
        track-by="id"
        placeholder="Microphone"
        :searchable="false"
        :show-labels="false"
        :options="audioTypeList()">
        <template 
          slot="singleLabel" 
          slot-scope="props">
          <img :src="`/img/icons/${props.option.icon}`" class="mr-2"/>
          <span class="option__desc"><span class="option__title">{{ props.option.name }}</span></span>
        </template>
        <template slot="option" slot-scope="props">
          <img :src="`/img/icons/${props.option.icon}`" class="mr-2"/>
          <span class="option__desc"><span class="option__title">{{ props.option.name }}</span></span>
        </template>
      </multiselect>

      <!--
    <div class="dropdown-menu" aria-labelledby="microphoneDropdown">
      <a v-for="microphone in microphones"
         :key="microphone.deviceId"
         @click.prevent="onMicrophoneChange(microphone)"
         :style="{cursor: 'pointer'}"
         class="dropdown-item">
        <b>
          {{ microphone.deviceId === selectedMicrophoneDeviceId ? '(Active)' : '' }}
        </b>
        {{ microphone.label }}
      </a>
    </div>
      -->

      <div class="level-container">
        <div
                class="one-level-container"
                v-for="level in 10"
                :key="level">
          <div
                  class="one-level"
                  :class="{'bg-success': level <= curLevel}">
          </div>
        </div>
      </div>
    </div>
    <!--
    <div class="form-group d-flex">
      <multiselect 
        v-model="curAudioVolumn" 
        track-by="id"
        placeholder="Host"
        :show-labels="false"
        :options="audioVolumnList">
        <template 
          slot="singleLabel" 
          slot-scope="props">
          <img :src="`/img/icons/${props.option.icon}`" class="mr-2"/>
          <span class="option__desc"><span class="option__title">{{ props.option.name }}</span></span>
        </template>
        <template slot="option" slot-scope="props">
          <img :src="`/img/icons/${props.option.icon}`" class="mr-2"/>
          <span class="option__desc"><span class="option__title">{{ props.option.name }}</span></span>
        </template>
      </multiselect>
      <button class="btn btn-outline-secondary btn-sm ml-1 my-1">Test</button>
    </div>
    -->
    <div class="form-group">
      <label>Camera</label>
      <multiselect 
        v-model="selectedCamera"
        track-by="id"
        placeholder="Camera"
        :show-labels="false"
        :searchable="false"
        :options="videoTypeList()">
        <template 
          slot="singleLabel" 
          slot-scope="props">
          <img :src="`/img/icons/${props.option.icon}`" class="mr-2"/>
          <span class="option__desc"><span class="option__title">{{ props.option.name }}</span></span>
        </template>
        <template slot="option" slot-scope="props">
          <img :src="`/img/icons/${props.option.icon}`" class="mr-2"/>
          <span class="option__desc"><span class="option__title">{{ props.option.name }}</span></span>
        </template>
      </multiselect>
    </div>
  </div>
</template>
<script>
import Multiselect from 'vue-multiselect'
import EnumerateDevicesMixin from "../mixins/EnumerateDevicesMixin";
export default {
  props: {
    preselectedCameraDeviceId: String,
    preselectedMicrophoneDeviceId: String,
  },
  components: {
    Multiselect
  },
  mixins: [
    EnumerateDevicesMixin
  ],
  mounted() {
    this.enumerateDevices(() => {

      let selectedMic = this.microphones.find((microphone) => {
        return microphone.deviceId === this.preselectedMicrophoneDeviceId;
      });

      let selectedCam = this.cameras.find((camera) => {
        return camera.deviceId === this.preselectedCameraDeviceId;
      });

      this.selectedMicrophone = {
        id: this.preselectedMicrophoneDeviceId,
        icon: 'ic_volume_small.svg',
        name: selectedMic ? selectedMic.label : 'Microphone',
      };

      this.selectedCamera = {
        id: this.preselectedCameraDeviceId,
        icon: 'ic_camera_small_grey.svg',
        name: selectedCam ? selectedCam.label : 'Camera',
      };
    });
  },
  data() {
    return {
        /*
      meetingTypeList: [
        {
          id: 1,
          icon: 'ic_locked_meeting.svg',
          name: 'Locked/Private'
        }
      ],
      hostList: [
        {
          id: 1,
          icon: 'ic_user_host.svg',
          name: 'james.dinsdale@simplevideo.net'
        }
      ],
      audioTypeList: [
        {
          id: 1,
          icon: 'ic_mic_small_grey.svg',
          name: 'Default-Internal Microphone'
        }
      ],
      audioVolumnList: [
        {
          id: 1,
          icon: 'ic_volume_small.svg',
          name: 'Default-Arctis 7'
        }
      ],
      videoTypeList: [
        {
          id: 1,
          icon: 'ic_camera_small_grey.svg',
          name: 'FaceTime HD Camera'
        }
      ],
      curMeetingType: '',
      curHost: '',
      curAudioVolumn: '',
         */
      selectedMicrophone: null,
      selectedCamera: null,
      curLevel: 5
    }
  },
  methods: {
    audioTypeList() {
      let microphones = this.microphones.map((microphone) => {
        return {
          id: microphone.deviceId,
          icon: 'ic_volume_small.svg',
          name: microphone.label,
        };
      });

      return microphones;
    },
    videoTypeList() {
      let cameras = this.cameras.map((camera) => {
        return {
          id: camera.deviceId,
          icon: 'ic_camera_small_grey.svg',
          name: camera.label,
        };
      });

      return cameras;
    },
  },
}
</script>