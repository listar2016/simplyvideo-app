<template>
  <main id="site-wrapper">
    <section class="section">
      <div class="container-fluid">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="#">Account</a></li>
          <li class="breadcrumb-item active">Billing</li>
        </ol>
        <div class="section-header">
          <div class="section-header-title">
            <router-link class="section-header-back" :to="{name: 'dashboard'}"><i class="far fa-arrow-circle-left"></i></router-link>
            <div class="section-header-title-group">
              <h1>Billing</h1>
              <p>Add your billing details for your account here</p>
            </div>
          </div>
        </div>
        <div class="row row-has-panel">
          <div class="col-xl-8">
            <div class="section-panel">
              <div class="section-panel-header">
                <div class="section-panel-header-title">
                  <h3>Billing Details</h3>
                </div>
                <div class="section-panel-header-action">
                  <a v-if="statusEdit" href="#" class="btn btn-link" @click.prevent="initBillingDetails"><img alt="" src="@/assets/img/icons/icon-delete-user.svg" />Cancel</a>
                  <a v-else href="#" class="btn btn-link" @click.prevent="statusEdit = true"><img alt="" src="@/assets/img/icons/icon-edit.svg" />Edit</a>
                </div>
              </div>
              <div class="section-panel-body">
                <form class="form-horizontal">
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="form-group" :class="{'form-error': errors.full_name}">
                        <label>
                          Full name
                        </label>
                        <input 
                          type="text" 
                          class="form-control" 
                          placeholder="Full name" 
                          v-model="newBillingDetails.full_name"
                          :readonly="!statusEdit"
                          />
                        <div 
                          class="form-error-message" 
                          v-for="(error, index) in errors.full_name"
                          :key="index">
                          {{ error }}
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="form-group" :class="{'form-error': errors.email}">
                        <label>Email address</label>
                        <input 
                          type="email" 
                          class="form-control" 
                          placeholder="Email address" 
                          v-model="newBillingDetails.email"
                          :readonly="!statusEdit"
                          />
                        <div 
                          class="form-error-message" 
                          v-for="(error, index) in errors.email"
                          :key="index">
                          {{ error }}
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="form-group" :class="{'form-error': errors.additional_email}">
                        <label>Additional Email address</label>
                        <input 
                          type="email" 
                          class="form-control" 
                          placeholder="Additional Email address" 
                          v-model="newBillingDetails.additional_email"
                          :readonly="!statusEdit"
                          />
                        <div 
                          class="form-error-message" 
                          v-for="(error, index) in errors.additional_email"
                          :key="index">
                          {{ error }}
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="form-group" :class="{'form-error': errors.company}">
                        <label>Company</label>
                        <input 
                          type="text" 
                          class="form-control" 
                          placeholder="Company" 
                          v-model="newBillingDetails.company"
                          :readonly="!statusEdit"
                          />
                        <div 
                          class="form-error-message" 
                          v-for="(error, index) in errors.company"
                          :key="index">
                          {{ error }}
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="form-group" :class="{'form-error': errors.phone}">
                        <label>Phone number</label>
                        <input 
                          type="text" 
                          class="form-control" 
                          placeholder="Phone number" 
                          v-model="newBillingDetails.phone"
                          :readonly="!statusEdit"
                          />
                        <div 
                          class="form-error-message" 
                          v-for="(error, index) in errors.phone"
                          :key="index">
                          {{ error }}
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="form-group" :class="{'form-error': errors.address}">
                        <label>Address</label>
                        <input 
                          type="text" 
                          class="form-control" 
                          placeholder="Address" 
                          v-model="newBillingDetails.address"
                          :readonly="!statusEdit"
                          />
                        <div 
                          class="form-error-message" 
                          v-for="(error, index) in errors.address"
                          :key="index">
                          {{ error }}
                        </div>  
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-12">
                      <hr/>
                    </div>
                    <!-- <div class="col-lg-6">
                      <div class="form-group">
                        <label>Currency</label>
                        <multiselect 
                          v-model="curCurrecy" 
                          track-by="id"
                          :custom-label="customLabel"
                          placeholder="Select Currency"
                          :show-labels="false"
                          :options="currencyList"
                          :disabled="!statusEdit">
                        </multiselect>
                      </div>
                    </div> -->
                    <div class="col-lg-6">
                      <div class="form-group" :class="{'form-error': errors.vat_number}">
                        <label>
                          VAT Number
                          <span class="info-popover" data-toggle="tooltip" data-title="Business name">
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
                          placeholder="VAT Number" 
                          v-model="newBillingDetails.vat_number"
                          :readonly="!statusEdit"
                          />
                        <div 
                          class="form-error-message" 
                          v-for="(error, index) in errors.vat_number"
                          :key="index">
                          {{ error }}
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="col-xl-4">

            <div class="section-panel">
                  <div class="section-panel-header">
                      <div class="section-panel-header-title">
                          <h3>Payment Method</h3>
                      </div>
                      <div class="section-panel-header-action">
                        <a class="btn btn-link" @click.prevent="showPaymentModal"><img alt="" src="@/assets/img/icons/icon-plus-primary.svg" />
                          {{ curPaymentMethod ? 'Change' : 'Add' }}
                        </a>
                      </div>
                  </div>

                  <div class="section-panel-body">
                    <form class="form-horizontal">
                      <div class="row">
                        <div class="col-12">
                          <div class="payment-information bg-light p-3 mt-0">
                            <div class="row" v-if="curPaymentMethod">
                              <div class="col-12 my-2">
                                <h6>**** **** **** {{ curPaymentMethod.mask }}</h6>
                              </div>
                              <div class="col-8 my-2">
                                <span>Expires on: <span class="font-weight-bold">{{ expiredDate | moment('MMM YYYY') }}</span></span>
                              </div>
                              <div class="col-4 my-2">
                                <img v-if="curPaymentMethod.brand === 'mastercard'" src="@/assets/img/mastercard_logo.svg" class="img-fluid">
                                <img v-if="curPaymentMethod.brand === 'visa'" src="@/assets/img/visa_logo.svg" class="img-fluid"/>
                              </div>
                            </div>
                            <div class="row" v-else>
                                <div class="col-12 my-2">
                                  <p>No payment method added</p>
                                </div>
                            </div>
                          </div>

                          <div class="w-100 text-right mt-1">
                            <a
                              v-if="curPaymentMethod"
                              href="#"
                              class="btn btn-link"
                              @click.prevent="showConfirmDelete"
                              v-tooltip = "{ content: 'Delete payment method'}">
                              <img alt="" src="@/assets/img/icons/icon-trash-primary.svg" />
                              Delete
                            </a>
                          </div>
                        </div>
                      </div>
                    </form>  
                  </div>
              </div>

            <div class="section-panel">
              <div class="section-panel-header">
                <div class="section-panel-header-title">
                  <h3>Upcoming invoice</h3>
                </div>
                <div class="section-panel-header-action">
                </div>
              </div>
              <div class="section-panel-body">

                <div v-if="isFetchingUpcomingInvoice">
                  <span class="fa fa-cog fa-spin mr-1"></span> Loading...
                </div>
                <div v-else>

                  <div v-if="upcomingInvoice.current_period_end">
                    <strong>
                      Next invoice:
                    </strong>
                    {{ upcomingInvoice.current_period_end }}
                    <br>
                    <br>
                    <strong>
                      Estimated amount:
                    </strong>
                    {{ formatMoney(upcomingInvoice.upcoming_amount) }}
                  </div>
                  <div v-else>
                      There is no upcoming invoice
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row" v-if="statusEdit">
          <div class="col-lg-12">
            <hr/>
            <div class="text-right">
                <a href="#" class="btn mr-2" @click.prevent="initBillingDetails()">Revert Changes</a>
                <a href="#" class="btn btn-primary" @click.prevent="saveBillingDetails()">Save &amp; Update</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <payment-method-modal v-if="isShowPaymentModal"
        v-on:close-payment-modal="closePaymentModal"
        v-on:payment-method-saved="selectDefaultPayment"
    ></payment-method-modal>

    <confirm-delete-recording
      v-if="isShowConfirmDelete"
      :title="curTitle"
      :content="curContent"
      @close="isShowConfirmDelete = false"
      @delete="deletePaymentMethod">
    </confirm-delete-recording>
    <confirm-dialog 
      v-if="isShowConfirmDialog"
      title="Are you sure you want to set current payment method to default?"
      description="Payments will be taken with this payment method."
      @no="isShowConfirmDialog = false"
      @yes="setDefaultPaymemt">
    </confirm-dialog>
  </main>
</template>
<script>
import {mapState} from 'vuex'
import ConfirmDeleteRecording from '@/components/ConfirmDeleteRecording'
import ConfirmDialog from '@/components/ConfirmDialog'
import PaymentMethodModal from "../../components/PaymentMethodModal";
import PaymentMethodModalMixin from "../../mixins/PaymentMethodModalMixin";
import axios from "axios";
import FormatMoneyMixin from "../../mixins/FormatMoneyMixin";
export default {
  mixins: [PaymentMethodModalMixin, FormatMoneyMixin],
  components: {
    ConfirmDeleteRecording,
    ConfirmDialog,
    PaymentMethodModal
  },
  computed: {
    ...mapState({
      billingDetails: state => state.auth.billing_details,
      paymentMethods: state => state.auth.payment_methods
    })
  },
  data() {
    return {
      // curCurrecy: {},
      statusEdit: false,
      newBillingDetails: {
        full_name: '',
        email: '',
        additional_email: '',
        company: '',
        phone: '',
        address: '',
        vat_number: ''
      },
      errors: [],

      expiredDate: '',

      isShowModal: false,
      curTitle: 'Are you sure you want to delete current payment method?',
      curContent: '',
      isShowConfirmDelete: false,
      curPaymentMethod: '',
      isShowConfirmDialog: false,

      isFetchingUpcomingInvoice: true,
      upcomingInvoice: {}
    }
  },
  created() {
    this.fetchUpcomingInvoice();
    this.$store.dispatch('getBillingDetails')
      .then(() => {
        this.initBillingDetails()
      }) 
    this.$store.dispatch('getPaymentMethods')
      .then(() => {
        this.selectDefaultPayment()
      })
  },
  watch: {
    curPaymentMethod(val) {
      if (val) {
        this.expiredDate = this.$moment(`${val.exp_month}/${val.exp_year}`, 'M/YYYY')
      } else {
        this.expiredDate = ''
      }
    }
  },
  methods: {
    initBillingDetails() {
      this.newBillingDetails = {...this.billingDetails}
      this.statusEdit = false
    },
    fetchUpcomingInvoice() {
      axios({url: '/upcoming-invoice', method: 'GET'})
        .then(response => {
          this.isFetchingUpcomingInvoice = false;
          this.upcomingInvoice = response.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    saveBillingDetails() {
      let vm = this
      vm.$store.dispatch('updateBillingDetails', vm.newBillingDetails)
        .then(() => {
          vm.$toast.success("The billing details updated successfully!")
          vm.errors = []
        })
        .catch(err => {
          try {
            let data= err.response.data
            vm.$toast.error(data.message)
            if (err.response.status === 422) {
              this.errors = data.errors
            }
          } catch {
            console.log(err)
          }
        })
    },
    showConfirmDelete() {
      this.isShowConfirmDelete = true
    },
    deletePaymentMethod() {
      let vm = this
      this.$store.dispatch('deletePaymentMethods', this.curPaymentMethod.id)
        .then(() => {
          vm.$toast.success('Your payment method is deleted successfully!')
          vm.isShowConfirmDelete = false
          this.$store.dispatch('getPaymentMethods')
            .then(() => {
              this.selectDefaultPayment()
            })
        })
        .catch(err => {
          try {
            let data= err.response.data
            vm.$toast.error(data.message)
            console.log(data.message)
          } catch {
            console.log(err)
          }
          this.isShowConfirmDelete = false
        })
    },
    selectDefaultPayment() {
      this.curPaymentMethod = this.paymentMethods.find(element => element.is_default)
    },
    showConfirmDialog() {
      this.isShowConfirmDialog = true
    },
    setDefaultPaymemt() {
      let vm = this
      this.$store.dispatch('setDefaultPayment', this.curPaymentMethod.id)
        .then(() => {
          vm.$toast.success('Your default payment method is set successfully!')
          vm.isShowConfirmDialog = false
          this.$store.dispatch('getPaymentMethods')
            .then(() => {
              this.selectDefaultPayment()
            })
        })
        .catch(err => {
          try {
            let data= err.response.data
            vm.$toast.error(data.message)
            console.log(data.message)
          } catch {
            console.log(err)
          }
          this.isShowConfirmDialog = false
        })
    }
  },
}
</script>