<template>
  <header class="page-header">
    <nav class="navbar navbar-expand-md">
      <div class="container-fluid">
        <div class="navbar-column">
            <router-link class="navbar-brand" :to="{name: 'dashboard'}">
              <img v-if="isWelcomePage" alt="Brand Logo" :src="logo" />
              <img v-else alt="Simply Video" :src="businessLogo" />
            </router-link>
        </div>
        <div class="navbar-column">
            <ul class="navbar-nav list-group-horizontal">
                <!--
                <li class="nav-item">
                    <router-link :to="{name: 'dashboard'}" class="nav-link nav-icon" data-notifications="true">
                        <img alt="Notifications" src="@/assets/img/icons/icon-notification.svg" />
                    </router-link>
                </li>
                -->
                <li class="nav-item mr-2">
                    <router-link :to="{name: 'dashboard'}" class="nav-link nav-icon">
                        <img alt="Profile" src="@/assets/img/icons/icon-user.svg" />
                    </router-link>
                </li>
                <li class="nav-item item-join">
                    <router-link :to="{name: 'join-meeting'}">
                        <button class="btn btn-primary">Join meeting</button>
                    </router-link>
                </li>
                <li class="nav-item nav-item-toggle">
                  <button type="button" class="btn-toggle-menu" aria-expanded="false" @click="toggleSidebar">
                    <span class="line-1"></span>
                    <span class="line-2"></span>
                    <span class="line-3"></span>
                  </button>
                </li>
            </ul>
        </div>
      </div>
    </nav>
  </header>
</template>
<script>
  import {mapState} from 'vuex'
  export default {
    computed: {
      ...mapState({
        logo: state => state.auth.logo,
        businessLogo: state => state.auth.business_logo
      }),
      isWelcomePage() {
        return this.$route.name === 'host' || this.$route.name === 'host-one-time-meeting'
      }
    },
    created() {
    },
    methods: {
      toggleSidebar(e) {
        let aria = e.currentTarget.getAttribute('aria-expanded');
        document.body.classList.toggle('sidebar-open');
        e.currentTarget.setAttribute('aria-expanded', aria === 'false');
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~bootstrap/scss/functions';
  @import '~bootstrap/scss/variables';
  @import '~bootstrap/scss/mixins';

  .nav-item.item-join {
    @include media-breakpoint-down(sm) {
      display: none;
    }
  }

  .nav-item {
    display: flex;

    .nav-link {
      padding: 0;
      display: flex;
    }
  }

  .nav-item-toggle {
    display: none;

    @include media-breakpoint-down(sm) {
      display: flex;
    }
  }

  .btn-toggle-menu {
    padding: 10px;
    border: 0;
    outline: 0;
    position: relative;
    border-radius: 0 !important;
    background-color: transparent;

    &[aria-expanded="true"] {
      .line-1 {
        transform: translateY(7px) rotate(45deg);
      }

      .line-2 {
        opacity: 0;
      }

      .line-3 {
        transform: translateY(-7px) rotate(-45deg);
      }
    }

    @for $i from 1 through 3 {
      .line-#{$i} {
        width: 24px;
        height: 2px;
        background-color: #1a1a1a;
        display: flex;
        transition: all .2s;
        opacity: 1;
      }
    }

    .line-2 {
      margin: 5px 0;
    }
  }
</style>
