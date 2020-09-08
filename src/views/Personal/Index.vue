<template>
    <router-view
        v-on:show-premium-feature-popup="$emit('show-premium-feature-popup')"
    ></router-view>
</template>
<script>
export default {
    created() {
        this.$store.dispatch('getUserProfile')
        this.$store.dispatch('getSettings')
    }   
}
</script>