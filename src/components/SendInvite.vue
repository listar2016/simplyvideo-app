<template>
  <div class="send-invite">
    <!--
    <div class="form-group">
      <label>Invite</label>
      <div class="d-flex">
        <input 
          class="form-control"
          type="email"
          placeholder="Email address"/>
        <button class="btn btn-outline-secondary btn-sm ml-1 my-1">Invite</button>
      </div>
      <div class="text-success"><i class="fas fa-check mr-1"/>Invitation sent successfully</div>
    </div>
    -->
    <div class="form-group meeting-details">
      <label>Meeting {{ webrtcAlias }}</label>
      <!--
      <div class="d-flex"><span>Meeting ID:</span><span class="ml-auto">{{ webrtcAlias }}</span></div>
      -->
      <div class="d-flex">
        <span class="text-heading">Direct URL:</span>
        <span class="ml-1">
            <a :href="directLink()" target="_blank" class="link">
              {{ directLink() }}
            </a>
        </span>
      </div>
    </div>
    <div class="form-group mb-0 input-cover">
      <button @click="copyUrl" class="btn btn-outline-secondary btn-sm w-100">Copy URL</button>
      <input ref="txtUrl" type="text" :value="directLink()">
    </div>
  </div>
</template>

<script>
  import CopyToClipboardMixin from "../mixins/CopyToClipboardMixin";
export default {
  mixins: [CopyToClipboardMixin],
  props: {
    webrtcAlias: String,
  },
  methods: {
    copyUrl() {
      this.copyToClipboard(
        this.$refs.txtUrl
      );
    },
    directLink() {
      let a = document.createElement('a');
      a.href = this.$router.resolve({
        name: 'welcome-guest',
        params: {
          webrtcAlias: this.webrtcAlias
        }
      }).href;
      return a.href;
    },
  }
}
</script>

<style lang="scss" scoped>
  .input-cover {
    position: relative;

    input {
      top: 0;
      left: 0;
      position: absolute;
      opacity: 0;
      z-index: -1;
    }
  }

  .text-heading {
    white-space: nowrap;
  }

  .link {
    word-break: break-word;
  }
</style>
