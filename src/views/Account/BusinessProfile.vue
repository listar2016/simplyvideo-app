<template>
  <main id="site-wrapper">
    <section class="section">
      <div class="container-fluid">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="#">Account</a></li>
          <li class="breadcrumb-item active">Business Profile</li>
        </ol>
        <div class="section-header">
          <div class="section-header-title">
            <router-link class="section-header-back" :to="{name: 'dashboard'}"><i class="far fa-arrow-circle-left"></i></router-link>
            <div class="section-header-title-group">
              <h1>Business Profile</h1>
              <p>Add your business contact details here</p>
            </div>
          </div>
        </div>
        <div class="row row-has-panel">
          <div class="col-lg-12">
            <div class="section-panel">
              <div class="section-panel-header">
                <div class="section-panel-header-title">
                  <h3>Details</h3>
                </div>
                <!-- <div class="section-panel-header-action">
                  <a v-if="statusEdit" href="#" class="btn btn-link" @click.prevent="discardEdit"><img alt="" src="@/assets/img/icons/icon-delete-user.svg" />Cancel &amp; Discard</a>
                  <a v-else href="#" class="btn btn-link" @click.prevent="statusEdit = true"><img alt="" src="@/assets/img/icons/icon-edit.svg" />Edit</a>
                </div> -->
              </div>
              <div class="section-panel-body">
                <form class="form-horizontal">
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="form-group" :class="{'form-error': errors.business_name}">
                        <label>
                          Business name
                        </label>
                        <input 
                          type="text" 
                          class="form-control" 
                          placeholder="Business name" 
                          v-model="newBusinessProfile.business_name"/>
                        <div 
                          class="form-error-message" 
                          v-for="(error, index) in errors.business_name"
                          :key="index">
                          {{ error }}
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="form-group" :class="{'form-error': errors.address_line_1}">
                        <label>Address line 1</label>
                        <input 
                          type="text" 
                          class="form-control" 
                          placeholder="Address line 1" 
                          v-model="newBusinessProfile.address_line_1"/>
                        <div 
                          class="form-error-message" 
                          v-for="(error, index) in errors.address_line_1"
                          :key="index">
                          {{ error }}
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="form-group" :class="{'form-error': errors.web_address}">
                        <label>
                          Web address
                        </label>
                        <input 
                          type="text" 
                          class="form-control" 
                          placeholder="Web address" 
                          v-model="newBusinessProfile.web_address"/>
                        <div 
                          class="form-error-message" 
                          v-for="(error, index) in errors.web_address"
                          :key="index">
                          {{ error }}
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="form-group" :class="{'form-error': errors.address_line_2}">
                        <label>Address line 2</label>
                        <input 
                          type="text" 
                          class="form-control" 
                          placeholder="Address line 2" 
                          v-model="newBusinessProfile.address_line_2"/>
                        <div 
                          class="form-error-message" 
                          v-for="(error, index) in errors.address_line_2"
                          :key="index">
                          {{ error }}
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="form-group" :class="{'form-error': errors.lead_contact}">
                        <label>
                          Company contact
                          <span class="info-popover" data-toggle="tooltip" data-title="Company contact" v-tooltip = "{ content: 'Company contact'}">
                            <svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                              <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <g id="Dashboard-_-Admin-_-Business-branding" transform="translate(-654.000000, -258.000000)" fill="currentColor" fill-rule="nonzero">
                                  <g id="Content" transform="translate(260.000000, 108.000000)">
                                    <g id="Notification" transform="translate(0.000000, 130.000000)">
                                      <path d="M402,20 C406.418278,20 410,23.581722 410,28 C410,32.418278 406.418278,36 402,36 C397.581722,36 394,32.418278 394,28 C394,23.581722 397.581722,20 402,20 Z M402,27 C401.447715,27 401,27.4477153 401,28 L401,28 L401,32 C401,32.5522847 401.447715,33 402,33 C402.552285,33 403,32.5522847 403,32 L403,32 L403,28 C403,27.4477153 402.552285,27 402,27 Z M402,23 C401.447715,23 401,23.4477153 401,24 C401,24.5522847 401.447715,25 402,25 C402.552285,25 403,24.5522847 403,24 C403,23.4477153 402.552285,23 402,23 Z" id="ic_info_popover"></path>
                                    </g>
                                  </g>
                                </g>
                              </g>
                            </svg>
                          </span>
                        </label>
                        <input 
                          type="text" 
                          class="form-control" 
                          placeholder="Company contact" 
                          v-model="newBusinessProfile.lead_contact"/>
                        <div 
                          class="form-error-message" 
                          v-for="(error, index) in errors.lead_contact"
                          :key="index">
                          {{ error }}
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="form-group" :class="{'form-error': errors.town}">
                        <label>Town/City</label>
                        <!-- <multiselect 
                          v-model="curTown" 
                          track-by="id"
                          label="name"
                          placeholder="Select Town"
                          :show-labels="false"
                          :options="allTowns">
                        </multiselect> -->
                        <input 
                          type="text" 
                          class="form-control" 
                          placeholder="County/State" 
                          v-model="newBusinessProfile.town"/>
                        <div 
                          class="form-error-message" 
                          v-for="(error, index) in errors.town"
                          :key="index">
                          {{ error }}
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="form-group" :class="{'form-error': errors.email}">
                        <label>Contact Email address</label>
                        <input 
                          type="email" 
                          class="form-control" 
                          placeholder="Email Address" 
                          v-model="newBusinessProfile.email"/>
                        <div 
                          class="form-error-message" 
                          v-for="(error, index) in errors.email"
                          :key="index">
                          {{ error }}
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="form-group" :class="{'form-error': errors.county_state}">
                        <label>County/State</label>
                        <!-- <multiselect 
                          v-model="curState" 
                          track-by="id"
                          label="name"
                          placeholder="Select County/State"
                          :show-labels="false"
                          :options="allStates">
                        </multiselect> -->
                        <input 
                          type="text" 
                          class="form-control" 
                          placeholder="County/State" 
                          v-model="newBusinessProfile.county_state"/>
                        <div 
                          class="form-error-message" 
                          v-for="(error, index) in errors.county_state"
                          :key="index">
                          {{ error }}
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="form-group" :class="{'form-error': errors.country}">
                        <label>
                          Country
                        </label>
                        <multiselect 
                          v-model="curCountry" 
                          track-by="id"
                          label="name"
                          placeholder="Select Country"
                          :show-labels="false"
                          :options="allCountries">
                        </multiselect>
                        <div 
                          class="form-error-message" 
                          v-for="(error, index) in errors.country"
                          :key="index">
                          {{ error }}
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="form-group" :class="{'form-error': errors.postcode}">
                        <label>Postcode/ZIP</label>
                        <input 
                          type="email" 
                          class="form-control" 
                          placeholder="Postcode/ZIP" 
                          v-model="newBusinessProfile.postcode"/>
                        <div 
                          class="form-error-message" 
                          v-for="(error, index) in errors.postcode"
                          :key="index">
                          {{ error }}
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div class="col-lg-12 mt-1 ml-auto">
              <hr/>
              <div class="form-group text-md-right">
                <button class="btn btn-md mr-2" @click.prevent="initBusinessProfile()">Revert changes</button>
                <button class="btn btn-md btn-primary" @click.prevent="updateBusinessProfile()">Save &amp; Update</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
<script>
import {mapState} from 'vuex'
import Multiselect from 'vue-multiselect'
let csc = require('country-state-city').default
export default {
  components: {
    Multiselect
  },
  data() {
    return {
      newBusinessProfile: {
        business_name: '',
        lead_contact: '',
        email: '',
        address_line_1: '',
        address_line_2: '',
        town: '',
        county_state: '',
        postcode: '',
        country: '',
        web_address: '',
      },
      allCountries: [],
      // allStates: [],
      // allTowns: [],
      curCountry: {},
      // curState: {},
      // curTown: {},
      errors: [],
    }
  },
  computed: {
    ...mapState({
      businessProfile: state => state.auth.business_profile
    })
  },
  watch: {
    curCountry(value) {
      if (value) {
        // this.allStates = csc.getStatesOfCountry(value.id)
        // this.curState = this.allStates.find(element => element.name === this.newBusinessProfile.county_state)
        this.newBusinessProfile.country = value.name
      } else {
        // this.allStates = []
        // this.curState = {}
        this.newBusinessProfile.country =''
      }
    },
    // curState(value) {
    //   if (value) {
    //     this.allTowns = csc.getCitiesOfState(value.id)
    //     this.curTown = this.allTowns.find(element => element.name === this.newBusinessProfile.town)
    //     this.newBusinessProfile.county_state =value.name
    //   } else {
    //     this.allTowns = []
    //     this.curTown = {}
    //     this.newBusinessProfile.county_state = ''
    //   }
    // },
    // curTown(value) {
    //   if (value) {
    //     this.newBusinessProfile.town = value.name
    //   } else {
    //     this.newBusinessProfile.town = ''
    //   }
      
    // }
  },
  created() {
    this.allCountries = csc.getAllCountries()
    this.$store.dispatch('getBusinessProfile')
      .then(() => {
        this.initBusinessProfile()
      })
  },
  methods: {
    initBusinessProfile() {
      this.newBusinessProfile = {...this.businessProfile}
      this.curCountry = this.allCountries.find(element => element.name === this.newBusinessProfile.country)
    },
    updateBusinessProfile() {
      let vm = this
      vm.$store.dispatch('updateBusinessProfile', vm.newBusinessProfile)
        .then(() => {
          vm.$toast.success("The business profile is updated successfully!")
          vm.errors = []
        })
        .catch(err => {
          try {
            let data= err.response.data
            vm.$toast.error(data.message)
            console.log(data.message)
            if (err.response.status === 422) {
              this.errors = data.errors
            }
          } catch {
            console.log(err)
          }
        })
    },
  }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>