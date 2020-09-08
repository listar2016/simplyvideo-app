<template>
  <header>
    <nav class="navbar navbar-expand-md">
      <ul class="container-fluid navbar-nav row mx-0">
        <li class="nav-item col-4 mx-0">
          <router-link :to="{name: innerPreviousRoute.name, params: innerPreviousRoute.params}" class="nav-link nav-icon d-none d-md-block">
            <img src="@/assets/img/icons/ic_go-back.svg" class="mr-1"/>
            Go Back
          </router-link>
        </li>

        <li v-if="guestWelcomeMessage" class="nav-item col-4 text-center mx-0">
          <router-link class="navbar-brand pt-2" :to="{name: 'dashboard'}">
            <img v-if="isWelcomePage" alt="Brand Logo" :src="logo" />
            <img v-else alt="Simply Video" :src="businessLogo" />
          </router-link>
          <div class="py-2">
            <h5>
              {{ guestWelcomeMessage }}
            </h5>
          </div>
        </li>
        <li v-else class="nav-item col-4 text-center mx-0">
          <router-link v-if="!isLoading" class="navbar-brand" :to="{name: 'dashboard'}">
            <img v-if="isWelcomePage" alt="Brand Logo" :src="logo" />
            <img v-else alt="Simply Video" :src="businessLogo" />
          </router-link>
        </li>

        <li class="nav-item col-4 text-right mx-0">
          <!--
          <router-link :to="{name: 'dashboard'}" class="nav-link nav-icon">
            <img src="@/assets/img/icons/ic_support.svg" class="mr-1"/>
            Support
          </router-link>
          -->
        </li>
      </ul>
    </nav>
  </header>
</template>
<script>
import {mapState} from 'vuex'
export default {
  computed: {
    ...mapState({
      logo: state => state.auth.logo,
      businessLogo: state => state.auth.business_logo,
      guestWelcomeMessage: state => state.auth.guest_welcome_message,
    }),
    isLoading() {
      return this.$store.getters.authStatus === 'loading'
    },
    isWelcomePage() {
      return this.$route.name === 'host' || this.$route.name === 'host-one-time-meeting' ||  this.$route.name === 'welcome-guest'
    }
  },
  data() {
    return {
      innerPreviousRoute: {
        name: '',
        params: {}
      }
    };
  },
  mounted(){
    this.updatePreviousRoute();
  },
  watch: {
    $route() {
        this.updatePreviousRoute();
    }
  },
  methods: {
    updatePreviousRoute(){
      let previousRoute = {name: 'welcome-guest'};

      if (
        this.$router.currentRoute.name === 'alpha-numeric-instructions' ||
        this.$router.currentRoute.name === 'numeric-instructions'
      ) {
        previousRoute.name = 'video-device-instructions';
      }

      if (this.$router.currentRoute.name === 'welcome-guest') {
        previousRoute.name = 'join-meeting';
      } else {
        previousRoute.params = {
          webrtcAlias: this.$router.currentRoute.params.webrtcAlias,
        };
      }

      this.innerPreviousRoute = previousRoute;
    },
  }
}
</script>