<template>
  <main id="site-wrapper">
    <section class="section">
      <div class="container-fluid">
        <div class="row row-has-panel">
          <div class="col-12">
            <div class="section-panel">
              <div class="section-panel-body text-center p-0">
                <div class="row vh-100">
                  <div class="col-md-6 center-container border-right ">
                    <div class="center-content">
                      <router-link :to="{name: 'ongoing-meeting'}">
                        <img src="@/assets/img/icons/ic_instant-meeting.svg"/>
                        <h6 class="text-dark my-2">Start an Instant meeting</h6>
                        <img src="@/assets/img/icons/ic_go.svg"/>
                      </router-link>
                      </div>
                  </div>
                  <div class="col-md-6 center-container">
                    <div class="center-content">
                      <router-link :to="{name: 'ongoing-meeting'}">
                        <img src="@/assets/img/icons/ic_organise-meeting.svg"/>
                        <h6 class="text-dark my-2">Organise meeting</h6>
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