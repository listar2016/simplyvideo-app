<template>
  <div class="action-cover">
    <div class="meeting-action bg-white"
         v-tooltip="enabled ? 'Disable screen share' : 'Enable screen share'"
         @click="$emit('toggle')"
    >
      <img v-show="enabled" src="@/assets/img/icons/ic_screen_share.svg" />
      <img v-show="!enabled" src="@/assets/img/icons/ic_screen_share_mute.svg" />
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      enabled: {
        type: Boolean,
        required: true
      }
    }
  }
</script>
