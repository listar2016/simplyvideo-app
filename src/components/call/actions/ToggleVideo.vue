<template>
  <div class="action-cover">
    <div class="meeting-action bg-white"
         v-tooltip="enabled ? 'Disable camera' : 'Enable camera'"
         @click="$emit('toggle')"
         v-if="allowed"
    >
      <img v-show="enabled" src="@/assets/img/icons/ic_camera.svg" />
      <img v-show="!enabled" src="@/assets/img/icons/ic_camera_mute.svg" />
    </div>

    <div class="meeting-action bg-white disabled" v-else>
      <img src="@/assets/img/icons/ic_camera_mute.svg" />
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      allowed: {
        type: Boolean,
        required: true
      },

      enabled: {
        type: Boolean,
        required: true
      }
    }
  }
</script>
