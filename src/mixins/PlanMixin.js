import {mapState} from "vuex";

export default {
    computed: {
        ...mapState({
            authUser: state => state.auth.user
        }),

        isAccountBusinessPlan() {

            let accountBillingPlan = (this.authUser && this.authUser.account) ? this.authUser.account.billing_plan : null;

            if (!accountBillingPlan) {
                return false;
            }

            return accountBillingPlan.id === 3;
        },

        isAuthUserBusinessPlan() {
            return this.authUser && this.authUser.billing_plan && (this.authUser.billing_plan.id === 3);
        },

        isPaidPlan() {
            return this.authUser && this.authUser.billing_plan && (this.authUser.billing_plan.id > 1);
        },

        authUserLoadedAndCannotAccessAdminFeatures() {
            return this.authUser && this.authUser.role && !this.canAuthUserAccessAdminFeatures;
        },

        canAuthUserAccessAdminFeatures() {

            // Business plan has admin management. Some sections/features can only be accessed by admins.
            if (this.isAccountBusinessPlan) {
                return this.authUser && this.authUser.role === 'Admin';
            }

            // In Free/Launch plan, anyone can access anything
            return true;
        },

        isAuthUserBusinessPlanAdmin() {
            return this.isAccountBusinessPlan && this.authUser && this.authUser.role === 'Admin';
        },
    },
    methods: {
        isPlanLevelAtLeast(billingPlanId) {
            return this.authUser && this.authUser.billing_plan && (this.authUser.billing_plan.id >= billingPlanId);
        },
    }
};
