<template>
	<section class="section">
        <div class="container">
            <div class="login-panel">
                <div class="heading text-center">
                    <h1>Start hosting<br class="d-none d-lg-block"/> online video meetings for free</h1>
                    <p>Simply add your details below to get started.</p>
                </div>
                <form class="form-horizontal mt-2" @submit.prevent="register">
                    <div class="form-group" :class="{ 'form-error' : errors.name }">
                        <label class="sr-only">First name</label>
                        <input type="text" class="form-control" placeholder="Your first name" v-model="name" />
                        <div class="form-error-message" v-for="(error, index) in errors.name" :key="index">{{ error }}</div>
                    </div>
                    <div class="form-group" :class="{ 'form-error' : errors.last_name }">
                        <label class="sr-only">Last name</label>
                        <input type="text" class="form-control" placeholder="Last Name" v-model="last_name" />
                        <div class="form-error-message" v-for="(error, index) in errors.last_name" :key="index">{{ error }}</div>
                    </div>
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
                    <div class="form-group">
                        <button type="submit" class="btn btn-lg btn-block btn-primary">Get started</button>
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
			name: "",
			last_name: "",
			email: "",
            password: "",
            errors: [],
		}
    },
	methods: {
		register() {
			let data = {
				name: this.name,
				last_name: this.last_name,
				email: this.email,
                password: this.password,
                password_confirmation: this.password,
                currency_id: 1,
			}
			this.$store.dispatch("register", data)
				.then(() => {
                    this.$toast.success("Registered successfully!")
                    this.$router.push("/dashboard")
                })
				.catch(err => {
                    console.log(err)
                    this.$toast.error(err.response.data.message)
                    if (err.response.data.errors) {
                        this.errors = err.response.data.errors
                    } else {
                        this.errors = []
                    }
                })
		}
	}
}
</script>