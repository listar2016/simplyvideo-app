<template>
	<section class="section">
        <div class="container">
            <div class="login-panel">
                <div class="heading text-center">
                    <h1>Reset Password</h1>
                </div>
                <form class="form-horizontal mt-1" @submit.prevent="resetPassword">
                    <div class="form-group" :class="{ 'form-error': errors.email }">
                        <label class="sr-only">Email address</label>
                        <input type="email" class="form-control" placeholder="Email address" v-model="email" />
                        <div class="form-error-message" v-for="(error, index) in errors.email" :key="index">{{ error }}</div>
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn btn-lg btn-block btn-primary">Reset Password</button>
                    </div>
                </form>
            </div>
        </div>
    </section>  
</template>
<script>

export default {
    data() {
        return {
            email: "",
            errors: []
        }
    },
    methods: {
        resetPassword() {
            let email = this.email
            this.$store.dispatch("resetPassword", {email})
                .then(() => {
                    this.$toast.success("If your email address exists in our database, you will receive a password recovery link at your email address in a few minutes.")
                    this.$router.push("/login")
                })
                .catch(err => {
                    console.log(err.response)
                    this.$toast.error(err.response.data.message)
                    if (err.response.status == 422) {
                        if (err.response.data.errors) {
                            this.errors = err.response.data.errors
                        } else {
                            this.errors = []
                        }
                    }
                })
        },
    }
}
</script>