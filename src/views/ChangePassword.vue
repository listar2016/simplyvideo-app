<template>
	<section class="section">
        <div class="container">
            <div class="login-panel">
                <div class="heading text-center">
                    <h1>Change Password</h1>
                </div>
                <form class="form-horizontal mt-1" @submit.prevent="changePassword">
					<div class="form-group" :class="{ 'form-error': errors.password }">
                        <label class="sr-only">Password</label>
                        <input type="password" class="form-control" placeholder="Password" v-model="password" />
                        <div class="form-error-message" v-for="(error, index) in errors.password" :key="index">{{ error }}</div>
                    </div>
                    <div class="form-group" :class="{ 'form-error': errors.password_confirmation }">
                        <label class="sr-only">Confirm Password</label>
                        <input type="password" class="form-control" placeholder="Confirm Password" v-model="password_confirmation" />
                        <div class="form-error-message" v-for="(error, index) in errors.password_confirmation" :key="index">{{ error }}</div>
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn btn-lg btn-block btn-primary">Change Password</button>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    props: {
        code: String
    },
	data() {
		return {
            password: "",
            password_confirmation: "",
            errors: [],
		}
    },
	methods: {
		changePassword() {
			let data = {
                password: this.password,
                password_confirmation: this.password_confirmation,
                code: this.code
			}
			this.$store.dispatch("changePassword", data)
				.then(() => {
                    this.$toast.success("Your password is changed successfully.")
                    this.$router.push("/login")
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