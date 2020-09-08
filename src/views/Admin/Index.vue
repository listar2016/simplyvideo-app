<template>
    <router-view
        v-on:show-premium-feature-popup="showPremiumFeaturePopup"
    ></router-view>
</template>
<script>
export default {
    created(){
        this.$store.dispatch('getSubUsers')
    },
    methods: {
        showPremiumFeaturePopup(premiumPopupTexts) {
            this.$emit('show-premium-feature-popup', premiumPopupTexts);
        }
    }
}
</script>