<template>
    <section class="section">
        <div class="container">
            <div class="login-panel">
                <div class="heading text-center">
                    <h1 v-if="authStatus === 'verify'">Your email was verified</h1>
                    <h1 v-else-if="authStatus === 'loading'">Verifying...</h1>
                    <h1 v-else>Verification was failed</h1>
                    <!-- <p>Simply add your details below to get started.</p> -->
                </div>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    props: {
        code: String
    },
    created() {
        this.emailVerify()
    },
    computed: {
        authStatus() {
            return this.$store.getters.authStatus;
        },
    },
    methods: {
        emailVerify() {
            this.$store.dispatch("emailVerify", this.code)
                .then(req => {
                    console.log(req)
                })
                .catch(err => {
                    console.log(err.response)
                })
        }
    },
}
</script>