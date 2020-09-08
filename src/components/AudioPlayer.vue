<template>
  <div class="media-player_container" :class="{'minimize': isMinimize}">
    <div class="media-player_header">
      <span class="title">Player</span>
      <a href="#" class="fas fa-times" @click="$emit('close')"></a>
      <a href="#" class="fas fa-external-link-alt" @click.prevent="isMinimize = false"></a>
      <a href="#" class="far fa-window-minimize" @click.prevent="isMinimize = true"></a>
    </div>
    <div class="media-player_content">
      <div class="row">
        <div class="col-12">
          <div class="music-icon">
            <i class="fas fa-music"></i>
          </div>
          <div class="media-information">
            <p>{{ recordName }}</p>
            <span><i class="far fa-calendar-alt"></i>{{ record.created_at | moment('DD/MM/YYYY HH:mm') }}</span>
            <!--
            <span><i class="fab fa-mixcloud"></i>{{ data_usage }}%</span>
            -->
          </div>
        </div>
      </div>
    </div>
    <div class="row m-0">
      <div class="col-12" v-if="record.mp4">
        <video width="100%" controls>
          <source :src="record.mp4" type="video/mp4">
        </video>
        <div class="download-action">
          <a :href="record.mp4" download target='_blank'>
            <img alt="" src="@/assets/img/icons/icon-download.svg" />
            Download
          </a>
        </div>
      </div>
      <div class="col-12" v-else-if="record.mp3">
        <audio controls>
          <source :src="record.mp3" type="audio/mpeg">
        </audio>
        <div class="download-action">
          <a :href="record.mp3" download target='_blank'>
            <img alt="" src="@/assets/img/icons/icon-download.svg" />
            Download
          </a>
        </div>
      </div>
      
    </div>
  </div>
</template>
<script>
export default {
  props: {
    record: Object,
    recordName: String
  },
  data() {
    return {
      isMinimize: false
    }
  },
  computed: {
    /*
    data_usage() {
      let duration = this.record.length_in_seconds;
      let percent = duration > 0 ? this.record.length_in_seconds * 100 / duration : 0
      return percent.toFixed(1)
    }
    */
  }
}
</script>