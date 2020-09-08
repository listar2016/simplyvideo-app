<template>
  <main id="site-wrapper">
    <section class="section">
      <div class="container-fluid">
        <div class="row row-has-panel">
          <div class="col-12">
            <div class="section-panel">
              <div class="section-panel-body text-center p-0">
                <div class="row vh-100">
                  <div class="col-md-4 center-container border-right ">
                    <div class="center-content">
                      <router-link :to="{name: 'ongoing-meeting'}">
                        <img src="@/assets/img/icons/ic_personal.svg"/>
                        <h6 class="text-dark mt-2 mb-1">Personal</h6>
                        <p class="text-dark">Join your permament personal meeting room</p>
                        <img src="@/assets/img/icons/ic_go.svg"/>
                      </router-link>
                      </div>
                  </div>
                  <div class="col-md-4 center-container border-right">
                    <div class="center-content">
                      <router-link :to="{name: 'ongoing-meeting'}">
                        <img src="@/assets/img/icons/ic_organise-meeting.svg"/>
                        <h6 class="text-dark mt-2 mb-1">Instant</h6>
                        <p class="text-dark">Join instantly created new meeting room</p>
                        <img src="@/assets/img/icons/ic_go.svg"/>
                      </router-link>
                    </div>
                  </div>
                  <div class="col-md-4 center-container">
                    <div class="center-content">
                      <router-link :to="{name: 'ongoing-meeting'}">
                        <img src="@/assets/img/icons/ic_instant-meeting.svg"/>
                        <h6 class="text-dark mt-2 mb-1">Other</h6>
                        <p class="text-dark">Join meeting room created by others, not you</p>
                        <img src="@/assets/img/icons/ic_go.svg"/>
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
<script>
export default {
  
}
</script>