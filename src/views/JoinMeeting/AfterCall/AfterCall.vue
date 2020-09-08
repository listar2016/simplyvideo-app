<template>
    <site-wrapper>
        <template v-slot:section-header>
            <h1>Your call is over</h1>
        </template>

        <router-link :to="{name: 'dashboard'}">
            <button class="btn btn-primary mb-1">Dashboard</button>
        </router-link>
    </site-wrapper>
</template>

<script>
    import SiteWrapper from "../Wrappers/SiteWrapper";

    export default {
        name: 'AfterCall',
        components: {
            SiteWrapper,
        },
        props: {},
        data() {
            return {};
        },
        mounted() {
        },
        methods: {}
    }
</script>
