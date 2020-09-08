<template>
  <section class="fill-viewport-h">
    <div class="d-flex align-items-center">
      <div class="d-flex">
        <div class="meeting-invite-notification">
          <div class="meeting-invite-notification-content">
            <router-link class="navbar-brand" :to="{name: 'dashboard'}"><img alt="Simply Video" src="@/assets/img/logo.svg" /></router-link>
            <h1>You've been invited to join a conference</h1>
            <p>Hi, there, meeting face to face with us couldn't be easier. Simply click on the button below to get started.</p>
            <a href="#" class="btn btn-lg btn-primary">Get started</a>
            <p class="help">Want to know more about our service first or get support?</p>
            <p class="help">Click <a href="#">here</a> and ask question now.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  props: {
    code: String
  },
  data() {
    return {
      meetingData: ''
    }
  },
  created() {
    this.$store.dispatch('directAccess', this.code)
      .then((resp) => {
        this.meetingData = resp.data
        console.log(this.meetingData)
      })
      .catch((err) => {
        console.log(err)
        this.$toast.error(err)
      })
  }
}
</script>