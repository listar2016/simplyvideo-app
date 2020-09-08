<template>
  <div class="navbar-settings">
    <!-- <p>
      <a href="#" class="text-body">
        <img src="@/assets/img/icons/ic_invite_participant.svg" class="mr-2">
        Invite participant
      </a>
    </p> -->
    <p>
      <a href="#" class="text-body" @click.prevent="$emit('muteAll')">
        <img v-if="muteStatus" src="@/assets/img/icons/ic_mic_small.svg" class="mr-2">
        <img v-else src="@/assets/img/icons/ic_mute_all_guests.svg" class="mr-2">
        {{ muteStatus ? 'Unmute All' : 'Mute all' }}
      </a>
    </p>  
    <!-- <p>
      <a href="#" class="text-body">
        <img src="@/assets/img/icons/ic_hide.svg" class="mr-2">
        Hide Participants
      </a>
    </p> -->
    <p class="mb-0">
      <a href="#" class="text-danger" @click.prevent="$emit('disconnectAll')">
        <img src="@/assets/img/icons/ic_disconect_all.svg" class="mr-2">
        Disconnect all
      </a>
    </p>
  </div>
</template>
<script>
export default {
  props: {
    muteStatus : Boolean
  },
}
</script>