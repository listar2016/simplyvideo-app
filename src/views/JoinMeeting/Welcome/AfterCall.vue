<template>
  <div class="d-flex h-100 justify-content-center">
    <div class="container">
      <div class="row mx-0">
        <div class="col-lg-6 mx-auto">
          <form class="form-horizontal mt-7">
            <h5>
              Good call? We hope so!
            </h5>
            <div class="text-center mt-3">
              <router-link :to="{name: 'register'}" class="btn btn-primary w-100">
                  Sign up for Free
              </router-link>
            </div>
            <div class="text-center my-3">
              <a href="https://simplyvideo.io/" class="btn btn-secondary w-100" target="_blank">
                  Learn more
              </a>
            </div>
          </form>
        </div>
        <!-- <div class="col-6 right-side-image d-none d-md-block">
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    reloadRequired: Boolean,
  },
  mounted() {
    this.$emit('disable-fullscreen');
    this.removeFavicon();

    if (this.reloadRequired) { // Otherwise Pexip doesn't release the camera and webcam light stays on
      window.location.reload();
    }
  },
  methods: {
    removeFavicon() {
      var link = document.createElement('link'),
          oldLink = document.getElementById('dynamic-favicon')
      link.id = 'dynamic-favicon'
      link.rel = 'shortcut icon'
      link.href = ''
      if (oldLink) {
          document.head.removeChild(oldLink);
      }
      document.head.appendChild(link);
    }
  }
}
</script>