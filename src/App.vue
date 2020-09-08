<template>
	<div class="h-100">
		<div v-if="!isFullscreen">
				<loading
						:active.sync="isLoading"
				></loading>
				<!--
				<div v-if="isMainPage">
					<main-nav-bar></main-nav-bar>
				</div>
				<div v-else>
					<nav-bar></nav-bar>
				</div>
				-->
				<call-nav-bar v-if="isCallPage"></call-nav-bar>
				<nav-bar v-else-if="isLoggedIn"></nav-bar>
				<main-nav-bar v-else></main-nav-bar>

				<side-bar
					v-on:show-premium-feature-popup="showPremiumFeaturePopup"
					v-if="isLoggedIn && !isMainPage"
				></side-bar>
		</div>
		<router-view
			:style="routerViewStyle"
			:is-fullscreen="isFullscreen"
			v-on:enable-fullscreen="enableFullscreen"
			v-on:disable-fullscreen="disableFullscreen"
			v-on:show-premium-feature-popup="showPremiumFeaturePopup"
		/>

		<premium-account
			v-if="isShowPremium"
			:header-text="premiumPopupTexts.headerText"
			:main-text="premiumPopupTexts.mainText"
			:button-text="premiumPopupTexts.buttonText"
			:hide-button="premiumPopupTexts.hideButton"
			@close="isShowPremium = false"
			v-on:hide-premium-feature-popup="hidePremiumFeaturePopup"
			:prev-route="$route.name"
		>
		</premium-account>
	</div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import SideBar from '@/components/SideBar.vue'
import MainNavBar from '@/components/MainNavBar.vue'
import CallNavBar from '@/components/CallNavBar.vue'
import PremiumAccount from '@/components/PremiumAccount'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import {mapState} from "vuex";

export default {
	components: {
		NavBar,
		SideBar,
		MainNavBar,
		CallNavBar,
        PremiumAccount,
		Loading
	},
  data() {
		return {
			isFullscreen: false,
			isShowPremium: false,
			premiumPopupTexts: {
				headerText: '',
				mainText: '',
				buttonText: '',
			}
		};
	},
	created() {
		this.$store.dispatch('getPlanData')
		this.$store.dispatch('getAddonData')

		if (this.isLoggedIn) {
			this.$store.dispatch('getUserProfile');
		}
	},
	mounted() {
		this.initSession()
	},
	computed: {
		isLoading() {
			return this.$store.getters.authStatus === 'loading'
		},
		isMainPage() {
			return this.$route.name === 'home' ||
					this.$route.name === 'login' ||
					this.$route.name === 'register' ||
					this.$route.name === 'email-verify' ||
					this.$route.name === 'forgot-password' ||
					this.$route.name === 'reset-password' ||
					this.$route.name === 'register-via-invite' ||
					this.$route.name === 'direct-access' ||
					this.$route.name === 'join-meeting' ||
					this.$route.name === 'welcome-guest' ||
					this.$route.name === 'host' ||
					this.$route.name === 'host-one-time-meeting' ||
					this.$route.name === 'video-device-instructions' ||
					this.$route.name === 'alpha-numeric-instructions' ||
					this.$route.name === 'numeric-instructions' ||
					this.$route.name === 'phone-instructions' ||
					this.$route.name === 'skype-instructions' ||
					this.$route.name === 'after-call'
		},
		isCallPage() {
			return this.$route.name === 'video-device-instructions' ||
				this.$route.name === 'welcome-guest' ||
				this.$route.name === 'alpha-numeric-instructions' ||
				this.$route.name === 'numeric-instructions' ||
				this.$route.name === 'phone-instructions' ||
				this.$route.name === 'skype-instructions' || 
				this.$route.name === 'call'
		},
		routerViewStyle() {
			let style = this.isFullscreen ? {
				position: 'absolute',
				top: '0',
				left: '0',
        width: '100%',
				height: '100%',
			} : {};

			return style;
		},
		...mapState({
			isLoggedIn: state => !!state.auth.token,
		})
	},
	methods: {
		toggleSidebar() {

		},
		showPremiumFeaturePopup(premiumPopupTexts) {
			this.isShowPremium = true;
			this.premiumPopupTexts = premiumPopupTexts || {};
		},
		hidePremiumFeaturePopup() {
			this.isShowPremium = false;
		},
		enableFullscreen() {
			this.isFullscreen = true;
		},
		disableFullscreen() {
			this.isFullscreen = false;
		},
		initSession() {
			// if (this.isMainPage) return
			let curDate = new Date()
			let expired_in = parseInt(localStorage.getItem('expired_in'))
			if (!expired_in) {
				this.$store.dispatch('logouts')
				if (this.$route.meta.requiresAuth) {
					this.$router.push({name: 'login'})
				}
				return
			}
			curDate.setMinutes(curDate.getMinutes() + 5)
			if (curDate.getTime() > expired_in) {
				this.$store.dispatch('logouts')
				if (this.$route.meta.requiresAuth) {
					this.$router.push({name: 'login'})
				}
				return
			}
			let diffMSeconds = (expired_in - curDate.getTime())
			let vm = this
			setTimeout(() => {
				vm.$store.dispatch('refreshToken')
			}, diffMSeconds)
		},
	}
}
</script>
