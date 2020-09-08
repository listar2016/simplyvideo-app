<template>
  <main id="site-wrapper">
    <section class="section">
      <div class="container-fluid">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="#">Personal</a></li>
          <li class="breadcrumb-item active">Meetings</li>
        </ol>
        <div class="section-header">
          <div class="section-header-title">
            <router-link class="section-header-back" :to="{name: 'meetings'}"><i class="far fa-arrow-circle-left"></i></router-link>
            <div class="section-header-title-group">
              <h1>Schedule a meeting</h1>
              <p>Pick the time, date & subject and add to your calendar</p>
            </div>
          </div>
        </div>
          <div class="row row-has-panel">
            <div :class="isShowGotcha ? 'col-xl-9' : 'col-xl-12'">
              <div class="section-panel">
                <div class="section-panel-body">
                  <form class="form-horizontal">
                    <div class="form-row">
                      <div class="col-lg-12">
                        <div 
                          class="form-group" 
                          :class="{'form-error': errors.subject}">
                          <label>Meeting subject</label>
                          <input 
                            type="text" 
                            class="form-control" 
                            placeholder="Subject..." 
                            v-model="subject"/>
                          <div 
                            class="form-error-message" 
                            v-for="(error, index) in errors.subject"
                            :key="index">
                            {{ error }}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-4">
                        <!-- <div class="form-group mb-0" :class="{'form-error': errors.start_date}">
                          <label>Choose a date</label>
                          <div 
                            class="form-group-dropdown" 
                            id="date_picker_start">
                            <div class="icon" for="dateInput">
                              <svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                  <g id="Dashboard-_-Personal-_-Meetings-_-Send-out-a-Meeting-_-Dropdown-Date" transform="translate(-310.000000, -425.000000)" fill="currentColor" fill-rule="nonzero">
                                    <g id="Content" transform="translate(260.000000, 108.000000)">
                                      <g id="Table" transform="translate(0.000000, 130.000000)">
                                        <g id="Select-box" transform="translate(25.000000, 136.000000)">
                                          <path d="M35.8833789,51.0067277 L36,51 C36.5128358,51 36.9355072,51.3860402 36.9932723,51.8833789 L37,52 L37,53 L38.6666667,53 C39.9553311,53 41,54.0446689 41,55.3333333 L41,64.6666667 C41,65.9553311 39.9553311,67 38.6666667,67 L27.3333333,67 C26.0446689,67 25,65.9553311 25,64.6666667 L25,55.3333333 C25,54.0446689 26.0446689,53 27.3333333,53 L29,53 L29,52 C29,51.4871642 29.3860402,51.0644928 29.8833789,51.0067277 L30,51 C30.5128358,51 30.9355072,51.3860402 30.9932723,51.8833789 L31,52 L31,53 L35,53 L35,52 C35,51.4871642 35.3860402,51.0644928 35.8833789,51.0067277 L36,51 L35.8833789,51.0067277 Z M39,60 L27,60 L27,64.6666667 C27,64.8507616 27.1492384,65 27.3333333,65 L38.6666667,65 C38.8507616,65 39,64.8507616 39,64.6666667 L39,60 Z M29,55 L27.3333333,55 C27.1492384,55 27,55.1492384 27,55.3333333 L27,58 L39,58 L39,55.3333333 C39,55.1492384 38.8507616,55 38.6666667,55 L37,55 L37,56 C37,56.5128358 36.6139598,56.9355072 36.1166211,56.9932723 L36,57 C35.4871642,57 35.0644928,56.6139598 35.0067277,56.1166211 L35,56 L35,55 L31,55 L31,56 C31,56.5128358 30.6139598,56.9355072 30.1166211,56.9932723 L30,57 C29.4871642,57 29.0644928,56.6139598 29.0067277,56.1166211 L29,56 L29,55 Z" id="ic_calendar"></path>
                                        </g>
                                      </g>
                                    </g>
                                  </g>
                                </g>
                              </svg>
                            </div>
                            <input 
                              type="text" 
                              class="form-control datepicker" 
                              placeholder="Choose" 
                              id="dateInput"/>
                          </div>
                          <div 
                            class="form-error-message" 
                            v-for="(error, index) in errors.start_date"
                            :key="index">
                            {{ error }}
                          </div>
                        </div> -->
                        <div class="form-group mb-0" :class="{'form-error': errors.start_date}">
                          <label>Choose a date</label>
                          <date-picker
                            v-model="startDate"
                            :min-date="new Date()"
                            color="orange"
                            class="custom-picker"
                            :popover="{visibility: 'click'}"
                          >
                            <div 
                              class="form-group-dropdown"
                            >
                              <div class="icon" for="dateInput">
                                <svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                  <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <g id="Dashboard-_-Personal-_-Meetings-_-Send-out-a-Meeting-_-Dropdown-Date" transform="translate(-310.000000, -425.000000)" fill="currentColor" fill-rule="nonzero">
                                      <g id="Content" transform="translate(260.000000, 108.000000)">
                                        <g id="Table" transform="translate(0.000000, 130.000000)">
                                          <g id="Select-box" transform="translate(25.000000, 136.000000)">
                                            <path d="M35.8833789,51.0067277 L36,51 C36.5128358,51 36.9355072,51.3860402 36.9932723,51.8833789 L37,52 L37,53 L38.6666667,53 C39.9553311,53 41,54.0446689 41,55.3333333 L41,64.6666667 C41,65.9553311 39.9553311,67 38.6666667,67 L27.3333333,67 C26.0446689,67 25,65.9553311 25,64.6666667 L25,55.3333333 C25,54.0446689 26.0446689,53 27.3333333,53 L29,53 L29,52 C29,51.4871642 29.3860402,51.0644928 29.8833789,51.0067277 L30,51 C30.5128358,51 30.9355072,51.3860402 30.9932723,51.8833789 L31,52 L31,53 L35,53 L35,52 C35,51.4871642 35.3860402,51.0644928 35.8833789,51.0067277 L36,51 L35.8833789,51.0067277 Z M39,60 L27,60 L27,64.6666667 C27,64.8507616 27.1492384,65 27.3333333,65 L38.6666667,65 C38.8507616,65 39,64.8507616 39,64.6666667 L39,60 Z M29,55 L27.3333333,55 C27.1492384,55 27,55.1492384 27,55.3333333 L27,58 L39,58 L39,55.3333333 C39,55.1492384 38.8507616,55 38.6666667,55 L37,55 L37,56 C37,56.5128358 36.6139598,56.9355072 36.1166211,56.9932723 L36,57 C35.4871642,57 35.0644928,56.6139598 35.0067277,56.1166211 L35,56 L35,55 L31,55 L31,56 C31,56.5128358 30.6139598,56.9355072 30.1166211,56.9932723 L30,57 C29.4871642,57 29.0644928,56.6139598 29.0067277,56.1166211 L29,56 L29,55 Z" id="ic_calendar"></path>
                                          </g>
                                        </g>
                                      </g>
                                    </g>
                                  </g>
                                </svg>
                              </div>
                              <input 
                                type="text" 
                                class="form-control datepicker" 
                                placeholder="Choose" 
                                id="dateInput"
                                v-model="formatDate"/>
                            </div>
                          </date-picker>
                        </div>
                      </div>
                      <div class="col-lg-4 mt-1 mt-lg-0">
                        <div 
                          class="form-group mb-0 clock-picker" 
                          :class="{'form-error': errors.starts_at}">
                          <label>
                            Meeting start
                          </label>
                          <multiselect 
                            v-model="startTime" 
                            :show-labels="false"
                            :showNoResults="false"
                            placeholder="Select or type"
                            @search-change="addTimeStart"
                            :preserveSearch="true"
                            :hide-selected="true"
                            :options="timeList">
                          </multiselect>
                          <div 
                            class="form-error-message" 
                            v-for="(error, index) in errors.starts_at"
                            :key="index">
                            {{ error }}
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-4 mt-1 mt-lg-0">
                        <div 
                          class="form-group mb-0 clock-picker"
                          :class="{'form-error': errors.ends_at}">
                          <label>Meeting ends</label>
                          <multiselect 
                            v-model="endTime" 
                            :show-labels="false"
                            :showNoResults="false"
                            placeholder="Select or type"
                            @search-change="addTimeEnd"
                            :preserveSearch="true"
                            :hide-selected="true"
                            :options="timeList">
                          </multiselect>
                          <div 
                            class="form-error-message" 
                            v-for="(error, index) in errors.ends_at"
                            :key="index">
                            {{ error }}
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr/>
                    <div class="row">
                      <div class="col-12 text-lg-right">
                        <a href="#" class="btn btn-gray" @click.prevent="saveMeeting()">Save</a>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div class="section-panel mt-2">
                <div class="section-panel-body">
                  <plugins></plugins>
                </div>
              </div>
            </div>
            <div class="col-xl mt-2 mt-xl-0" v-if="isShowGotcha">
              <gotcha :tip-list="tipList" @close="isShowGotcha = false"></gotcha>
            </div>
          </div>
      </div>
    </section>
  </main>
</template>
<script>
import Gotcha from '@/components/Gotcha'
import {mapState} from 'vuex'
import Multiselect from 'vue-multiselect'
import Plugins from "../../components/Plugins";
export default {
  components: {
    Gotcha,
    Multiselect,
    Plugins
  },
  props: [
    'id'
  ],
  computed: {
    ...mapState({
      settings: state => state.auth.settings,
      selMeeting: state => state.meeting.sel_meeting
    }),
    formatDate() {
      return this.$moment(this.startDate).format('MM/DD/YYYY')
    }
  },
  data: () => ({
    tipList: [
      "Create a scheduled calls here by filling out the subject, date and time",
      "Send invites to your guest via your email provider or share in plain text by copy & pasting"
    ],
    isShowGotcha: true,
    subject: '',
    startDate: new Date(),
    startTime: '',
    endTime: '',
    errors: [],
    timeList: [],
    isManualStart: false
  }),
  created() {
    this.timeList = []
    for(let t = 480; t <= 1200; t+=15) {
      let h = parseInt(t / 60)
      let m = t % 60
      let str_h = (h > 9) ? h : "0" + h
      let str_m = (m > 9) ? m : "0" + m
      this.timeList.push(str_h + ":" + str_m)
    }
    if (this.id) {
      this.$store.dispatch('getMeeting', this.id)
        .then(() => {
          this.subject = this.selMeeting.subject
          let starts_at = this.$moment(this.selMeeting.starts_at, 'YYYY-MM-DD HH:mm')
          let ends_at = this.$moment(this.selMeeting.ends_at, 'YYYY-MM-DD HH:mm')
          this.startTime = starts_at.format('HH:mm')
          this.endTime = ends_at.format('HH:mm')
          this.startDate = starts_at.format('MM/DD/YYYY')
          // eslint-disable-next-line
          // $('#dateInput').datepicker('setDate', this.startDate);
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      this.startDate = new Date()
      this.startTime = "09:00"
      this.endTime = "09:30"
    }
  },
  mounted() {
    // eslint-disable-next-line
    // $('#dateInput').datepicker({
    //   autoclose: true,
    //   orientation: 'bottom',
    //   startDate: this.$moment().format('MM/DD/YYYY'),
    //   setDate: this.startDate,
    //   templates: {
    //     leftArrow: '<i class="far fa-angle-left"></i>',
    //     rightArrow: '<i class="far fa-angle-right"></i>',
    //   },
    // }).on('hide', () => {
    //   // eslint-disable-next-line
    //   $("#date_picker_start").removeClass('is-focus')
    // }).on('show', () => {
    //   // eslint-disable-next-line
    //   $("#date_picker_start").addClass('is-focus')
    // })

    // // eslint-disable-next-line
    // $("#date_picker_start").click(() => {
    //   // eslint-disable-next-line
    //   $("#dateInput").datepicker('show');
    // })
  },
  methods: {
    addTimeStart(val) {
      this.addTime(val)
      this.startTime = val
    },
    addTimeEnd(val) {
      this.addTime(val)
      this.endTime = val
    },
    addTime(val) {
      if (val.length === 5) {
        let findIndex = this.timeList.findIndex(element => element === val)
        if (findIndex === -1) this.timeList.push(val)
      }
    },
    saveMeeting() {
      var vm= this
      // eslint-disable-next-line
      // vm.startDate = $('#dateInput').val()
      vm.errors = []
      let flag_error = false
      if (!vm.subject) {
        vm.errors.subject = ['The subject field is required!']
        flag_error = true
      }
      if (!vm.startDate) {
        vm.errors.start_date = ['The start date field is required!']
        flag_error = true
      }
      if (!vm.startTime) {
        vm.errors.starts_at = ['The start time field is required!']
        flag_error = true
      }
      if (!vm.endTime) {
        vm.errors.ends_at = ['The end time field is required!']
        flag_error = true
      }
      if (flag_error) return
      let starts_at = vm.$moment(`${vm.formatDate} ${vm.startTime}`,'MM/DD/YYYY HH:mm')
      let ends_at = vm.$moment(`${vm.formatDate} ${vm.endTime}`,'MM/DD/YYYY HH:mm')
      if (!starts_at.isValid()) {
        vm.errors.starts_at = ['The start time is not a valid date!']
        flag_error = true
      }
      if (!ends_at.isValid()) {
        vm.errors.ends_at = ['The end time is not a valid date!']
        flag_error = true
      }
      if (flag_error) return
      if (vm.id) {
        let param = {
          id: vm.id,
          subject: vm.subject,
          description: vm.subject,
          starts_at: starts_at.format('YYYY-MM-DD HH:mm'),
          ends_at: ends_at.format('YYYY-MM-DD HH:mm')
        }
        vm.$store.dispatch('updateMeeting', param)
          .then(() => {
            vm.$toast.success("The meeting is updated successfully!");
            vm.errors = []
            vm.$router.push({
              name: 'meeting-updated', params: {id: vm.id}
            });
          })
          .catch(err => {
            try {
              let data= err.response.data
              vm.$toast.error(data.message)
              console.log(data.message)
              if (err.response.status === 422) {
                vm.errors = data.errors
              } 
            } catch {
              vm.$toast.error(err)
            }
          })  
      } else {
        let pin = '', guest_pin = ''
        vm.settings.forEach(item => {
          switch(item.key) {
            case 'pin':
              pin = item.value
              break
            case 'guest_pin':
              guest_pin = item.value
              break
          }
        })
        
        let param = {
          pin: pin,
          guest_pin: guest_pin,
          subject: vm.subject,
          description: vm.subject,
          starts_at: starts_at.format('YYYY-MM-DD HH:mm'),
          ends_at: ends_at.format('YYYY-MM-DD HH:mm')
        }
        vm.$store.dispatch('addMeeting', param)
          .then((response) => {
            vm.$toast.success("The meeting is added successfully!");
            let meetingId = response.data.id;
            vm.errors = []
            vm.$router.push({
              name: 'meeting-invites', params: {id: meetingId}
            });
          })
          .catch(err => {
            try {
              let data= err.response.data
              vm.$toast.error(data.message)
              console.log(data.message)
              if (err.response.status === 422) {
                vm.errors = data.errors
              } 
            } catch {
              vm.$toast.error(err)
            }
          })  
      }
    },
    removeClass(val) {
      if (val ===1) {
        // eslint-disable-next-line
        $("#clock_picker_start .form-group-dropdown").removeClass('is-focus')
      } else if (val === 2) {
        // eslint-disable-next-line
        $("#clock_picker_end .form-group-dropdown").removeClass('is-focus')
      }
    },
  },

}
</script>