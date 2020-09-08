<template>
	<main id="site-wrapper">
        <section class="section">
            <div class="container-fluid">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a>Admin</a></li>
                    <li class="breadcrumb-item active">User Management</li>
                </ol>
                <div class="section-header">
                    <div class="section-header-title">
                        <router-link class="section-header-back" :to="{name: 'dashboard'}"><i class="far fa-arrow-circle-left"></i></router-link>
                        <h1>User Management</h1>
                    </div>
                    <div class="section-header-action">
                        <router-link v-if="canAuthUserAccessAdminFeatures" :to="{ name:'create-user' }" class="btn btn-gray">
                            <img alt="" src="@/assets/img/icons/icon-plus.svg" />Create a new user
                        </router-link>

                        <!--
                        <router-link v-if="canAuthUserAccessAdminFeatures" :to="{ name: 'account-plan' }" class="btn btn-gray">
                            <img alt="" src="@/assets/img/icons/icon-plus.svg" />Upgrade billing plan
                        </router-link>
                        -->
                    </div>
                </div>
                <!--
                <div class="row row-has-panel">
                    <div class="col-lg-12">
                        <div class="section-panel">
                            <div class="section-panel-header">
                                <div class="section-panel-header-title">
                                    <h3>Billing plan</h3>
                                </div>
                            </div>
                            <div class="section-panel-body" v-if="authUser.id">
                                <table class="table table-borderless table-data">
                                    <thead>
                                    <tr>
                                        <th>Account's plan</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>
                                            {{ authUser.account.billing_plan.name }}
                                            <router-link v-if="canAuthUserAccessAdminFeatures" :to="{ name: 'account-plan' }">
                                                Upgrade
                                            </router-link>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                -->
                <div class="row row-has-panel">
                    <div class="col-lg-12">
                        <div class="section-panel">
                            <div class="section-panel-header">
                                <div class="section-panel-header-title">
                                    <h3>Licenses in use</h3>
                                </div>
                                <div class="section-panel-header-action">
                                    <!--
                                    <a href="#" class="btn btn-link"><img alt="" src="@/assets/img/icons/icon-plus-primary.svg" />Add billing details</a>
                                    -->
                                </div>
                            </div>
                            <div class="section-panel-body">
                                <table class="table table-borderless table-data">
                                    <thead>
                                        <tr>
                                            <th>Free</th>
                                            <th>Launch</th>
                                            <th>Business</th>
                                            <!--
                                            <th>Next invoice</th>
                                            <th>Estimated amount</th>
                                            -->
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{{ cntBasic }}</td>
                                            <td>{{ cntPro }}</td>
                                            <td>
                                                {{ cntBusiness }}
                                                <span v-if="authUser.spare_business_licenses">
                                                    (and {{ authUser.spare_business_licenses }} unused)
                                                </span>
                                                <a
                                                    class="btn-link"
                                                    style="cursor:pointer;"
                                                    v-if="(cntBusiness === 0) && (authUser.spare_business_licenses === 2)"
                                                    @click.prevent="isShowCancelBusinessLicensesDialog = true"
                                                >
                                                    Unsubscribe
                                                </a>
                                            </td>
                                            <!--
                                            <td>
                                                <span v-if="!isFetchingUpcomingInvoice">
                                                    {{ upcomingInvoice.current_period_end ? upcomingInvoice.current_period_end : '' }}
                                                </span>
                                            </td>
                                            <td>
                                                <span v-if="!isFetchingUpcomingInvoice">
                                                    {{ upcomingInvoice.current_period_end ? formatMoney(upcomingInvoice.upcoming_amount) : '' }}
                                                </span>
                                            </td>
                                            -->
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row row-has-panel">
                    <div class="col-lg-12">
                        <div class="section-panel">
                            <div class="section-panel-header">
                                <div class="section-panel-header-title">
                                    <h3>All users</h3>
                                </div>
                                <div class="section-panel-header-action">
                                    <router-link v-if="canAuthUserAccessAdminFeatures"
                                            :to="{ name:'create-user' }" class="btn btn-link"><img alt="" src="@/assets/img/icons/icon-plus-primary.svg" />Create new user</router-link>
                                </div>
                            </div>
                            <div class="section-panel-body">
                                <div class="table-responsive">
                                    <table class="table table-borderless table-data table-hide-last-column">
                                        <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email Address</th>
                                            <th>Phone</th>
                                            <th>Room ID</th>
                                            <th>License</th>
                                            <th>Addons</th>
                                            <th>Role</th>
                                            <th>&nbsp;</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="user in userList" :key="user.id">
                                            <td>
                                                <i
                                                        class="fa fa-info-circle mx-1 text-danger"
                                                        v-if="user.is_pending"
                                                        v-tooltip = "{content: 'Pending invitation', classes: ['tooltip-danger']}">
                                                </i>
                                                <i
                                                        class="far fa-ban"
                                                        v-if="user.is_blocked"
                                                        v-tooltip = "{ content: 'User block status'}"
                                                ></i>
                                                {{ user.name }} {{ user.last_name }}
                                                <strong v-if="user.id === authUser.id">
                                                    (you)
                                                </strong>
                                            </td>
                                            <td>{{ user.is_pending ? user.invite_emailed_to : user.email }}</td>
                                            <td>
                                                {{ user.phone }}
                                            </td>
                                            <td>
                                                <span
                                                    v-if="user.meeting_room"
                                                >    
                                                    <router-link 
                                                        target="_blank"
                                                        :to="user.id === authUser.id ? 
                                                            {name: 'host',
                                                                params: {spWebrtcAlias: user.meeting_room.webrtc.alias }} 
                                                            : {name: 'welcome-guest', 
                                                                params: {
                                                                    webrtcAlias: user.meeting_room.webrtc.alias,
                                                                    preloadedMeetingRoom: user.meeting_room
                                                                }
                                                            }"
                                                    >
                                                        {{ user.meeting_room.webrtc.alias }}
                                                    </router-link>
                                                </span>    
                                                <!--
                                                <a href="#">{{user.meeting_room ? user.meeting_room.webrtc.alias :'' }}</a>
                                                -->
                                            </td>
                                            <td>
                                                <router-link v-if="user.billing_plan && canAuthUserAccessAdminFeatures" :to="editPlanAndRoleLink(user)">
                                                    {{ user.billing_plan.name }}
                                                </router-link>
                                                <span v-else>
                                                    {{ user.billing_plan ? user.billing_plan.name : '' }}
                                                </span>
                                            </td>
                                            <td>
                                                <span v-if="!user.is_pending">
                                                    <router-link v-if=" canAuthUserAccessAdminFeatures" :to="editPlanAndRoleLink(user)">
                                                        <span v-if="user.addons.length">
                                                            {{ user.addons.map((addon) => {return addon.name}).join(',') }}
                                                        </span>
                                                        <span v-else>
                                                            No addons
                                                        </span>
                                                    </router-link>
                                                    <span v-else>
                                                        <span v-if="user.addons.length">
                                                            {{ user.addons.map((addon) => {return addon.name}).join(',') }}
                                                        </span>
                                                        <span v-else>
                                                            No addons
                                                        </span>
                                                    </span>
                                                </span>
                                            </td>
                                            <td>
                                                <span v-if="!user.is_pending">
                                                    <router-link v-if="canAuthUserAccessAdminFeatures" :to="editPlanAndRoleLink(user)">
                                                        {{ user.role }}
                                                    </router-link>
                                                    <span v-else>
                                                        {{ user.role }}
                                                    </span>
                                                </span>
                                            </td>
                                            <td class="td-action">
                                                <div v-if="!user.is_pending">
                                                    <a v-if="!isUserAdmin(user) && canAuthUserAccessAdminFeatures && (user.id !== authUser.id)" href="#" class="table-action" data-disabled="true" @click.prevent="blockUser(user.id, user.is_blocked)">
                                                        <i class="far fa-ban"></i>
                                                        {{ user.is_blocked ? 'Unblock': 'Block' }}
                                                    </a>
                                                    <a v-if="!isUserAdmin(user) && canAuthUserAccessAdminFeatures && (user.id !== authUser.id)" href="#" class="table-action" @click.prevent="deleteUser(user.id)">
                                                        <i class="fal fa-times"></i>
                                                        Delete
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <confirm-dialog
                v-if="isShowCancelBusinessLicensesDialog"
                title="Are you sure you want to cancel?"
                description="Business plan offers useful features and optional upgrades"
                @no="isShowCancelBusinessLicensesDialog = false"
                @yes="cancelBusinessLicenses">
        </confirm-dialog>
    </main>
</template>
<script>
import { mapState } from 'vuex'
import DirectLinkMixin from "../../mixins/DirectLinkMixin";
import PlanMixin from "../../mixins/PlanMixin";
import ConfirmDialog from '@/components/ConfirmDialog'
import axios from 'axios'
import FormatMoneyMixin from "../../mixins/FormatMoneyMixin";
export default {
    name: 'user-management',
    mixins: [DirectLinkMixin, PlanMixin, FormatMoneyMixin],
    components: {
        ConfirmDialog
    },
    data() {
        return {
            isShowCancelBusinessLicensesDialog: false,
            // isFetchingUpcomingInvoice: true,
            // upcomingInvoice: {}
        }
    },
    computed: {
        ...mapState({
            userList: state => state.user.subUsers,
            roleList: state => state.billingPlan.roles,
            authUser: state => state.auth.user
        }),
        cntBasic() {
            return this.userList.filter( item => item.billing_plan && item.billing_plan.id === 1).length
        },
        cntPro() {
            return this.userList.filter( item => item.billing_plan && item.billing_plan.id === 2).length
        },
        cntBusiness() {
            return this.userList.filter( item => item.billing_plan && item.billing_plan.id === 3).length
        },
        /*
        cntAll() {
            return this.userList.length
        }
         */
    },
    created() {
        this.$store.dispatch('getUserProfile');
        // this.fetchUpcomingInvoice();
    },
    methods: {
        editPlanAndRoleLink(user) {
            if (user.id === this.authUser.id) {
                return {name: 'account-plan'};
            }

            return {name: 'plans-role', params: {id: user.id, prevRoute: 'user-management'}};
        },
        /*
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
         */
        isUserAdmin(user) {
            return user.role === 'Admin';
        },
        blockUser(id, status) {
            this.$store.dispatch('blockUser', { id, status })
                .then(() => {
                    if (status) {
                        this.$toast.success("The current user is unblocked successfully!")
                    } else {
                        this.$toast.success("The current user is blocked successfully!")
                    }
                    console.log(this.userList)
                })
                .catch(err => {
                    this.$toast.error(err)
                })
        },
        deleteUser(id) {
            this.$store.dispatch('deleteUser', { id })
                .then(() => {
                    this.$toast.success("The current user is deleted successfully!");
                    window.location.reload();
                })
                .catch(err => {
                    this.$toast.error(err)
                })  
        },
        cancelBusinessLicenses() {

            this.$store.dispatch('setLoadingStatus', 'loading');

            axios({url: '/cancel-spare-business-licenses', method: 'PATCH'})
                .then(resp => {
                    console.log(resp);
                    this.$store.dispatch('getUserProfile').then(() => {
                        this.$toast.success('Unsubscribed!');
                        this.isShowCancelBusinessLicensesDialog = false;
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        },
    }
}
</script>
