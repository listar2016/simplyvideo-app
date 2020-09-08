<template>
  <div class="item-self-view" style="z-index:20">
    <video id="self-stream" autoplay></video>

    <p class="error position-absolute" v-if="error">Error</p>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    props: [
      'isScreenShare',
      'videoStream'
    ],
    data() {
      return {
        constraints: {
          audio: false,
          video: true
        },
        error: false
      }
    },

    computed: {
      ...mapState('call', ['camera'])
    },

    watch: {
      isScreenShare() {
        this.getMedia()
      }
    },

    mounted() {
      this.getMedia()
    },

    methods: {
      async getMedia() {
        let video = this.$el.querySelector('#self-stream')
        try {
          if (this.isScreenShare) {
            video.srcObject = this.videoStream
            video.play()
          } else {
            let stream = await navigator.mediaDevices.getUserMedia(this.constraints)
            video.srcObject = stream
          }
        } catch (error) {
          this.error = true;
        }
      }
    }
  }
</script>
