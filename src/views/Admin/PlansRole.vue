<template>
    <main id="site-wrapper">
        <section class="section">
            <div class="container-fluid">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><router-link :to="{ name:'user-management' }">Admin</router-link></li>
                    <li class="breadcrumb-item"><router-link :to="{ name:'user-management' }">User Management</router-link></li>
                    <li class="breadcrumb-item active">Plans &amp; Role</li>
                </ol>
                <div class="section-header">
                    <div class="section-header-title">
                        <router-link class="section-header-back" :to="{name: prevRoute}"><i class="far fa-arrow-circle-left"></i></router-link>
                        <h1>Plans &amp; Role</h1>
                    </div>
                </div>
                <div class="row row-has-panel" v-if="curUser.id">
                    <div class="col-12">
                        <p class="m-0">
                            Editing {{ curUser.name }} {{ curUser.last_name }} ({{ curUser.email }})
                        </p>
                    </div>
                </div>
                <div class="row row-has-panel">
                    <div class="col-xl-6">
                        <div class="section-panel">
                            <div class="section-panel-header">
                                <div class="section-panel-header-title">
                                    <h3>Plan</h3>
                                </div>
                            </div>
                            <div class="section-panel-body">
                                <div class="plan-subtitle">
                                    <h4>Standard Plan</h4>
                                </div>
                                <div class="plan-option" v-for="plan in planList" :key="plan.id" :class="{'is-checked': curPlanId === plan.id }">
                                    <div class="plan-option-header">
                                        <a href="#"><i class="far fa-arrow-circle-left"></i></a>
                                        <span data-trigger="expandable" @click="slideToggle(`plan-${plan.id}`)" :ref="`span-plan-${plan.id}`">
                                            {{ plan.name }}
                                            -
                                            <span v-if="(plan.name === 'Business') && authUser.spare_business_licenses">
                                                {{ formatMoney(0) }} (spare license available)
                                            </span>
                                            <span v-else>
                                                {{ formatMoney(plan.price) }}
                                            </span>
                                        </span>
                                        <div class="plan-option-checkbox">
                                            <input :id="`check-plan-${plan.id}`" type="checkbox" @change="setCurrentPlan(plan.id, $event)" :checked="curPlanId === plan.id"/>
                                            <label :for="`check-plan-${plan.id}`"></label>
                                        </div>
                                    </div>
                                    <div class="expandable" :ref="`div-plan-${plan.id}`">
                                        <div class="expandable-content">
                                            <p>
                                                {{ plan.description }}
                                            </p>
                                            <p v-if="plan.name === 'Business'" style="color:darkred;">
                                                Minimum purchase is 2 licenses
                                                <br>
                                                After the purchase you can assign licenses to individual users
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div class="plan-subtitle" v-if="currentPlan.included_addons && currentPlan.included_addons.length">
                                    <h4>Included Addons</h4>
                                </div>
                                <div class="plan-option is-checked" v-for="addon in currentPlan.included_addons" :key="`inc-${addon.id}`">
                                    <div class="plan-option-header">
                                        <a href="#"><i class="far fa-arrow-circle-left"></i></a>
                                        <span data-trigger="expandable" @click="slideToggle(`inc-${addon.id}`)" :ref="`span-inc-${addon.id}`">
                                            {{ addon.name }}
                                            (included)
                                            <!--
                                            - {{ formatMoney(addon.price) }}
                                            -->
                                        </span>
                                        <div class="plan-option-checkbox">
                                            <input :id="`check-inc-addon-${addon.id}`" type="checkbox" checked disabled/>
                                            <label :for="`check-inc-addon-${addon.id}`"></label>
                                        </div>
                                    </div>
                                    <div class="expandable" :ref="`div-inc-${addon.id}`">
                                        <div class="expandable-content">
                                            <p>
                                                {{ addon.description }}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="plan-subtitle" v-if="currentPlan.available_addons && currentPlan.available_addons.length">
                                    <h4>Available Addons</h4>
                                </div>
                                <div class="plan-option" v-for="addon in currentPlan.available_addons" :key="`avl-${addon.id}`" :class="{'is-checked': isIncludeAddon(addon.id)}">
                                    <div class="plan-option-header">
                                        <a href="#"><i class="far fa-arrow-circle-left"></i></a>
                                        <span data-trigger="expandable" @click="slideToggle(`avl-${addon.id}`)" :ref="`span-avl-${addon.id}`">
                                            {{ addon.name }}
                                            - {{ formatMoney(addon.price) }}
                                        </span>
                                        <div class="plan-option-checkbox">
                                            <input :id="`check-avl-addon-${addon.id}`" type="checkbox" @change="changeAddon(addon.id, $event)" :checked="isIncludeAddon(addon.id)"/>
                                            <label :for="`check-avl-addon-${addon.id}`"></label>
                                        </div>
                                    </div>
                                    <div class="expandable" :ref="`div-avl-${addon.id}`">
                                        <div class="expandable-content">
                                            <p>
                                                {{ addon.description }}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="curUser.id" class="col-xl col-sm-6 mt-2 mt-xl-0">
                        <div class="section-panel">
                            <div class="section-panel-header">
                                <div class="section-panel-header-title">
                                    <h3>Role</h3>
                                </div>
                            </div>
                            <div class="section-panel-body">
                                <div class="custom-checkbox" v-for="role in availableRoleList" :key="`role-${role.id}`">
                                    <div v-if="role.role_name === 'admin' && !isAuthUserBusinessPlan">
                                        <input :id="`check-role-${role.id}`"
                                           type="checkbox"
                                           :checked="curRoleId === role.id"
                                           @click.prevent="onAdminRoleClicked"
                                        />
                                        <label :for="`check-role-${role.id}`">{{ role.display_name }}</label>
                                    </div>
                                    <div v-else-if="availableRoleList.length === 1">
                                        <input :id="`check-role-${role.id}`"
                                               type="checkbox"
                                               :checked="curRoleId === role.id"
                                               @click.prevent=""
                                        />
                                        <label :for="`check-role-${role.id}`">{{ role.display_name }}</label>
                                    </div>
                                    <div v-else>
                                        <input :id="`check-role-${role.id}`" type="checkbox" @change="setCurrentRole(role.id, $event)" :checked="curRoleId === role.id"/>
                                        <label :for="`check-role-${role.id}`">{{ role.display_name }}</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl col-sm-6 mt-2 mt-xl-0" v-if="curUser.id && isShowGotcha">
                        <gotcha :tip-list="tipList" @close="isShowGotcha = false"></gotcha>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-12">
                        <hr/>
                        <div v-if="isPaymentMethodsLoaded" class="text-right">
                            <!--
                            <a href="#" class="btn btn-text" @click.prevent="initPlanRole()">
                                Revert changes
                            </a>
                            -->
                            <router-link class="btn btn-text" :to="{ name:'user-management' }">Revert changes</router-link>

                            <span v-if="currentPlan">
                                <a v-if="defaultPaymentMethod" class="btn btn-primary text-white" @click.prevent="showPaymentConfirmationModal">Proceed to confirmation</a>
                                <a v-else class="btn btn-primary text-white" @click.prevent="showPaymentModal">Proceed to payment</a>
                            </span>
                            <span v-else>
                                <a class="btn btn-outline-dark disabled">
                                    Please select plan
                                </a>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <payment-method-modal v-if="isShowPaymentModal"
          :button-text="'Add payment method'"
          v-on:close-payment-modal="closePaymentModal"
          v-on:payment-method-saved="showPaymentConfirmationModal"
        ></payment-method-modal>

        <payment-confirmation-modal v-if="isShowPaymentConfirmationModal"
          :cur-user="curUser"
          :default-payment-method="defaultPaymentMethod"
          :selected-plan="currentPlan"
          :selected-addons="curAddons"
          :old-plan="curUser.billing_plan"
          v-on:close-payment-confirmation-modal="closePaymentConfirmationModal"
          v-on:confirm-and-pay="onConfirmAndPay"
        ></payment-confirmation-modal>

    </main>
</template>
<script>
import { mapState } from 'vuex'
import Gotcha from '@/components/Gotcha'
import PlanMixin from "../../mixins/PlanMixin";
import PaymentMethodModal from "../../components/PaymentMethodModal";
import PaymentConfirmationModal from "../../components/PaymentConfirmationModal";
import PaymentMethodModalMixin from "../../mixins/PaymentMethodModalMixin";
import PaymentConfirmationModalMixin from "../../mixins/PaymentConfirmationModalMixin";
import FormatMoneyMixin from "../../mixins/FormatMoneyMixin";
import axios from "axios";
export default {
    mixins: [PlanMixin, FormatMoneyMixin, PaymentMethodModalMixin, PaymentConfirmationModalMixin],
    props: [ 'id', 'prevRoute'],
    components:{
        Gotcha,
        PaymentMethodModal,
        PaymentConfirmationModal
    },
    data() {
        return {
            curPlanId: '',
            curRoleId: '',
            curAddons: [],
            curUser: '',
            isShowGotcha: true,
            tipList: [
                "Add or upgrade users standard plan",
                "Add an optional plan such as Legacy device connector",
                "Add storage for recordings"
            ],
            isPaymentMethodsLoaded: false,
        }
    },
    computed: {
        ...mapState({
            roleList: state => state.billingPlan.roles,
            planList: state => state.billingPlan.plans,
            addonList: state => state.billingPlan.addons,
            paymentMethods: state => state.auth.payment_methods,
        }),
        defaultPaymentMethod() {
            return this.paymentMethods.find(element => element.is_default);
        },
        currentPlan() {
            return this.curPlanId ? this.planList.find(item => item.id === this.curPlanId) : ''
        },
        availableRoleList() {

            // Regular user cannot remove Admin role privileges
            if (this.curUser.role === 'Admin' && this.authUser.role !== 'Admin') {
                return [
                    { id: 1, display_name: 'Admin', role_name: 'admin' },
                ];
            }

            // Admin cannot remove admin privileges from himself
            if (this.authUser.role === 'Admin' && (this.authUser.id === this.curUser.id)) {
                return [
                    { id: 1, display_name: 'Admin', role_name: 'admin' },
                ];
            }

            return this.roleList;
        },
    },
    watch: {
        curPlanId(val) {
            setTimeout(() => {
                let vm = this
                vm.planList.forEach(element => {
                    if (element.id === val) {
                        vm.slideExpand(`plan-${element.id}`, true)
                        if (element.included_addons && element.included_addons.length) {
                            element.included_addons.forEach(sub_element => {
                                vm.slideExpand(`inc-${sub_element.id}`, true)
                            })
                        }
                    } else {
                        vm.slideExpand(`plan-${element.id}`, false)
                    }
                })
            }, 200)
        }
    },
    created() {
        if (this.id) {
            this.getSubUser();
        } else {
            this.getUserProfile();
        }

        this.$store.dispatch('getPaymentMethods')
            .then(() => {
                this.isPaymentMethodsLoaded = true;
            });
    },
    methods: {
        onConfirmAndPay() {
            this.updatePlanRole();
        },
        onAdminRoleClicked() {

            if (this.curUser.role === 'Admin') {
                return;
            }

            let mainText = 'Only Business plan users can use account admins. Upgrade your account to unlock this feature.';
            this.$emit('show-premium-feature-popup', {
                mainText: mainText
            });
        },
        getSubUser() {
            this.$store.dispatch('getSubUser', this.id).then(response => {
                this.curUser = response
                this.initPlanRole()
            })
                .catch(err => {
                    this.$toast.error(err)
                })
        },
        getUserProfile() {
            this.$store.dispatch('getUserProfile').then(response => {
                this.curUser = response.data
                this.initPlanRole()
            })
                .catch(err => {
                    this.$toast.error(err)
                })
        },
        setCurrentPlan(id, event) {
            if (event.target.checked) {
                let vm = this
                vm.curPlanId = id
                vm.curAddons = []
                let curPlan = vm.planList.find(item => item.id === id)
                curPlan.included_addons.forEach(item => {
                    vm.curAddons.push(item)
                });
            } else {
                this.curPlanId = ''
                this.curAddons = []
            }
        },
        setCurrentRole(id, event) {
            if (event.target.checked){
                this.curRoleId = id
            } else {
                this.curRoleId = ''
            }
        },
        slideToggle(id) {
            let expandWidget = this.$refs[`div-${id}`][0]
            let expandSpan = this.$refs[`span-${id}`][0]
            if (expandSpan.classList.value){
                expandSpan.classList = []
                expandWidget.style.maxHeight = ''
            } else {
                expandSpan.classList = ['is-active']
                expandWidget.style.maxHeight = expandWidget.scrollHeight + 'px'
            }
        },
        slideExpand(id, status) {
            let expandWidget = this.$refs[`div-${id}`][0]
            let expandSpan = this.$refs[`span-${id}`][0]
            if (status){
                expandSpan.classList = ['is-active']
                expandWidget.style.maxHeight = expandWidget.scrollHeight + 'px'
            } else {
                expandSpan.classList = []
                expandWidget.style.maxHeight = ''
            }
        },
        isIncludeAddon(id) {
            let findIndex = this.curAddons.findIndex(item => item.id === id)
            if (findIndex>=0) {
                this.slideExpand(`avl-${id}`, true)
                return true
            } else {
                return false
            }
        },
        changeAddon(id, event) {
            if (event.target.checked) {
                let curAddon = this.addonList.find(item => item.id === id)
                this.curAddons.push(curAddon)

                if (curAddon.name === '24h Storage for Recordings') {
                    this.deselect100GbStorageAddon();
                    this.deselect500GbStorageAddon();
                }

                if (curAddon.name === '100GB Storage for Recordings') {
                    this.deselect500GbStorageAddon();
                    this.deselect24hStorageAddon();
                }

                if (curAddon.name === '500GB Storage for Recordings') {
                    this.deselect100GbStorageAddon();
                    this.deselect24hStorageAddon();
                }
                this.slideExpand(`avl-${id}`, true)
            } else {
                let delIndex = this.curAddons.findIndex(item => item.id === id)
                this.curAddons.splice(delIndex, 1)
                this.slideExpand(`avl-${id}`, false)
            }
        },
        deselect100GbStorageAddon() {
            let indexOf100 = this.curAddons.findIndex((curAddon) => {
                return curAddon.name === '100GB Storage for Recordings';
            });

            if (indexOf100 >= 0) {
                this.curAddons.splice(indexOf100, 1);
            }
        },
        deselect500GbStorageAddon() {
            let indexOf500 = this.curAddons.findIndex((curAddon) => {
                return curAddon.name === '500GB Storage for Recordings';
            });

            if (indexOf500 >= 0) {
                this.curAddons.splice(indexOf500, 1);
            }
        },
        deselect24hStorageAddon() {
            let indexOf24 = this.curAddons.findIndex((curAddon) => {
                return curAddon.name === '24h Storage for Recordings';
            });

            if (indexOf24 >= 0) {
                this.curAddons.splice(indexOf24, 1);
            }
        },
        initPlanRole() {
            if (this.curUser) {
                this.curPlanId = this.curUser.billing_plan ? this.curUser.billing_plan.id : ''
                if (this.curUser.role) {
                    let curRole = this.roleList.find( role => role.display_name === this.curUser.role)
                    this.curRoleId = curRole ? curRole.id : ''
                } else {
                    this.curRoleId = ''
                }
                this.curAddons = [...this.curUser.addons]
            } else {
                this.curPlanId = ''
                this.curRoleId = ''
                this.curAddons = []
            }
        },
        updatePlanRole() {

            this.closePaymentConfirmationModal();

            let vm = this
            if (!vm.curPlanId) {
                vm.$toast.error('Please select a plan!')
                return
            }
            if (!vm.curRoleId) {
                vm.$toast.error('Please select a role!')
                return
            }
            let curRoleName = vm.roleList.find( role => role.id === vm.curRoleId ).role_name

            let includedAddonIds = this.currentPlan.included_addons.map((includedAddon) => {
                return includedAddon.id;
            });

            let addonIds = vm.curAddons.map((curAddon) => {
                return curAddon.id;
            }).filter((addonId) => {
                return includedAddonIds.indexOf(addonId) === -1;
            });

            let params = {
                role: curRoleName,
                billing_plan_id: vm.curPlanId,
                addon_ids: addonIds
            };

            this.$store.dispatch('setLoadingStatus', 'loading');

            axios({url: '/subusers/'+vm.curUser.id, data: params, method: 'PATCH'})
                .then(response => {
                    let paymentIntentClientSecret = response.data.payment_intent_client_secret;
                    if (response.status === 200 && paymentIntentClientSecret) {
                        this.confirmCardPayment(paymentIntentClientSecret);
                    } else {
                        this.onUpdated();
                    }
                })
                .catch(err => {
                    if (err.response && err.response.data) {
                        let data= err.response.data
                        vm.$toast.error(data.message)
                        if (err.response.status === 422) {
                            for (let messages of Object.values(data.errors)) {
                                for (let msg of messages) {
                                    vm.$toast.error(msg)
                                }
                            }
                        }
                    } else {
                        vm.$toast.error(err)
                    }
                });
        },
        includeStripe(URL, callback ){

            // eslint-disable-next-line
            if (typeof Stripe !== 'undefined'){
                callback();
                return;
            }

            let documentTag = document,
                tag = 'script',
                object = documentTag.createElement(tag),
                scriptTag = documentTag.getElementsByTagName(tag)[0]
            object.src = '//' + URL
            if (callback) {
                object.addEventListener('load', function (e) {
                    callback(null, e)
                }, false)
            }
            scriptTag.parentNode.insertBefore(object, scriptTag)
        },
        confirmCardPayment(paymentIntentClientSecret) {
            axios({url: '/payments/form', method: 'GET'})
                .then(resp => {
                    this.includeStripe('js.stripe.com/v3/', () => {

                        // eslint-disable-next-line
                        let stripe = Stripe(resp.data.stripe_key);

                        stripe.confirmCardPayment(paymentIntentClientSecret)
                            .then((result) => {

                                if (result.error) {
                                    let paymentIntentId = result.error.payment_intent.id;
                                    this.onPaymentConfirmationFailed(result.error, paymentIntentId);
                                }

                                if (result.paymentIntent) {
                                    axios({url: '/confirm-payment/'+result.paymentIntent.id, data: {}, method: 'POST'})
                                    .then(() => {
                                        this.$store.dispatch('setLoadingStatus', '');
                                        this.onUpdated();
                                    })
                                    .catch((error) => {
                                        this.onPaymentConfirmationFailed(error);
                                    });
                                }
                            });
                    });
                })
                .catch(error => {
                    this.onPaymentConfirmationFailed(error);
                });
        },
        onUpdated() {
            this.$store.dispatch('getSubUsers').then(() => {
                this.$router.push({name: 'user-management'});
                this.$toast.success("Plan and addons updated successfully!")
            })
        },
        onPaymentConfirmationFailed(error, paymentIntentId) {

            if (paymentIntentId) {

                axios({url: '/failed-payment/'+paymentIntentId, data: {}, method: 'POST'})
                    .then(() => {
                        this.$store.dispatch('setLoadingStatus', '');
                        this.$toast.error("Payment confirmation failed");
                    })
                    .catch((error) => {
                        console.log(error);
                        this.$store.dispatch('setLoadingStatus', '');
                        this.$toast.error("Payment confirmation failed");
                    });

                return;
            }

            this.$store.dispatch('setLoadingStatus', '');
            this.$toast.error("Payment confirmation failed");
        },
    }
}
</script>