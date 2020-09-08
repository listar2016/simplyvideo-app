<template>
	<header>
        <nav class="navbar navbar-expand-md">
            <div class="container">
                <router-link class="navbar-brand" :to="{name: 'dashboard'}"><img alt="Simply Video" src="@/assets/img/logo.svg" /></router-link>
                <ul class="navbar-nav mr-auto">
                    <!--
                    <li class="nav-item"><a class="nav nav-link" href="#">Home</a></li>
                    <li class="nav-item"><a class="nav nav-link" href="#">Plans</a></li>
                    <li class="nav-item"><a class="nav nav-link" href="#">Solutions</a></li>
                    <li class="nav-item"><a class="nav nav-link" href="#">Features</a></li>
                    <li class="nav-item"><a class="nav nav-link" href="#">Resources</a></li>
                    <li class="nav-item"><a class="nav nav-link" href="#">Contact</a></li>
                    -->
                </ul>
                <ul class="navbar-nav list-group-horizontal ml-auto">
                    <li class="nav-item" v-if="!isLoggedIn">
                        <router-link class="nav nav-link" to="/login">Log In</router-link>
                    </li>
					<li class="nav-item ml-1 ml-3" v-if="!isLoggedIn">
                        <router-link class="nav nav-link" to="/register">Register</router-link>
                    </li>
                    <li class="nav-item ml-1" v-if="isLoggedIn">
                        <a class="nav nav-link" href="#" @click="logout">Logout</a>
                    </li>
                    <li class="nav-item ml-3">
                        <router-link :to="{name: 'join-meeting'}">
                            <button class="btn btn-primary">Join meeting</button>
                        </router-link>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
</template>
<script>
import { mapState } from 'vuex'
export default {
	computed: {
		...mapState({
			isLoggedIn: state => !!state.auth.token,
		})
	},
	methods: {
		logout() {
			this.$store.dispatch("logout").then(() => {
				this.$router.push("/login");
			})
		}
	}
}
</script>
