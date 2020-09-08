<template>
    <router-view
        v-on:show-premium-feature-popup="showPremiumFeaturePopup"
    ></router-view>
</template>
<script>
import PlanMixin from "../../mixins/PlanMixin";
export default {
    mixins: [PlanMixin],
    created() {
        if (this.authUserLoadedAndCannotAccessAdminFeatures) {
            this.$router.push({'name': 'dashboard'});
        }
    },
    methods: {
        showPremiumFeaturePopup(premiumPopupTexts) {
            this.$emit('show-premium-feature-popup', premiumPopupTexts);
        }
    }
}
</script>