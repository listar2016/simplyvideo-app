<template>
	<section class="section">
        <div class="container">
            <div class="login-panel">
                <div class="heading text-center">
                    <h1>Start hosting<br class="d-none d-lg-block"/> online video meetings for free</h1>
                    <!-- <p>Simply add your details below to get started.</p> -->
                </div>
                <form class="form-horizontal mt-2" @submit.prevent="login">
                    <div class="form-group" :class="{ 'form-error': errors.email }">
                        <label class="sr-only">Email address</label>
                        <input type="email" class="form-control" placeholder="Email address" v-model="email" />
                        <div class="form-error-message" v-for="(error, index) in errors.email" :key="index">{{ error }}</div>
                    </div>
					<div class="form-group" :class="{ 'form-error': errors.password }">
                        <label class="sr-only">Password</label>
                        <input type="password" class="form-control" placeholder="Password" v-model="password" />
                        <div class="form-error-message" v-for="(error, index) in errors.password" :key="index">{{ error }}</div>
                    </div>
                    <router-link class="float-right mb-1" :to="{name: 'forgot-password'}">Forgot your Password?</router-link>
                    <div class="form-group">
                        <button type="submit" class="btn btn-lg btn-block btn-primary">Log In</button>
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
            password: "",
            errors: []
        }
    },
    methods: {
        login() {
            let email = this.email
            let password = this.password
            this.$store.dispatch("login", { email, password })
                .then(() => {
                    this.$toast.success("Login successful!")
                    this.$router.push("/dashboard")
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