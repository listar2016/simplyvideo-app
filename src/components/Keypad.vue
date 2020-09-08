<template>
  <div class="keypad">
    <form class="form-horizontal">
      <div class="row">
        <div v-for="n in 9" class="one-pad" :key="n" @click="sendDTMF(`${n}`)">
          <span>{{ n }}</span>
        </div>
        <div class="one-pad" @click="sendDTMF('*')">
          <span>*</span>
        </div>
        <div class="one-pad" @click="sendDTMF('0')">
          <span>0</span>
        </div>
        <div class="one-pad" @click="sendDTMF('#')">
          <span>#</span>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  methods: {
    sendDTMF(digit) {
      let sound = new Audio('beep.mp3')
      sound.play()
      this.$emit('sendDTMF', digit)
    }
  }
}
</script>
