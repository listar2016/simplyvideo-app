import axios from 'axios'
export default {
	state: {
		status: '',
    token: localStorage.getItem('token') || '',
    expired_in: localStorage.getItem('expired_in') || '',
		user: {},
		settings: [],
		personal_brand: {},
		business_brand: {},
		prev_route: {},
		business_profile: {},
		billing_details: {},
		stripe: {},
		payment_methods: [],
		invoices: [],
		logo: 'img/logo.svg',
		business_logo: 'img/logo.svg',
		guest_welcome_message: '',
	},
	mutations: {
		auth_request(state) {
			state.status = 'loading'
		},
		auth_success(state, token, user, expired_in) {
			state.status = 'success'
			state.token = token
      state.user = user
      state.expired_in = expired_in
		},
		auth_error(state) {
			state.status = 'error'
      state.token = ''
      state.user = {}
      state.expired_in = 0
		},
		email_verify(state) {
			state.status = 'verify'
		},
		logout(state) {
			state.status = ''
      state.token = ''
      state.user = {}
      state.expired_in = 0
		},
		set_status(state, status) {
			state.status = status
		},
		set_user_profile(state, data) {
			state.user = data
		},
		update_profile(state, data) {
			state.user.name = data.name
			state.user.last_name = data.last_name
		},
		update_credentials(state, data) {
			if (data.email) state.email = data.email
		},
		update_room_id(state, data) {
			state.user.meeting_room.webrtc.direct_access_token = data.direct_access_token
		},
		set_settings(state, data) {
			state.settings = data
		},
		update_meeting_settings(state, data) {
			state.settings.forEach(item => {
				switch(item.key) {
					case 'pin':
						item.value = data.pin
						break
					case 'guest_pin':
						item.value = data.guest_pin
						break
					case 'set_host_pin':
						item.value = data.set_host_pin
						break
					case 'set_guest_pin':
						item.value = data.set_guest_pin
						break
				}
			})
		},
		update_email_settings(state, data) {
			state.settings.forEach(item => {
				switch(item.key) {
					case 'notify_host_before_meeting_starts':
						item.value = data.notify_host_before_meeting_starts
						break
					case 'notify_guests_before_meeting_starts':
						item.value = data.notify_guests_before_meeting_starts
						break
					case 'notify_host_when_guest_enters_room':
						item.value = data.notify_host_when_guest_enters_room
						break
				}
			})
		},
		update_password_settings(state) {
			state.settings.forEach(item => {
				switch(item.key) {
					case 'plugin_password':
						item.value = ''
						break
				}
			})
		},
		set_personal_brand(state, data) {
			state.personal_brand = data
		},
		set_business_brand(state, data) {
			state.business_brand = data
		},
		update_business_brand_info(state, data) {
			state.business_brand.guest_welcome_message = data.guest_welcome_message
			state.business_brand.business_name = data.business_name
			state.business_brand.subdomain = data.subdomain
		},
		update_business_brand_colors(state, data) {
			state.business_brand.primary_color_hex = data.primary_color_hex
			state.business_brand.secondary_color_hex = data.secondary_color_hex
		},
		set_prev_route(state, data) {
			state.prev_route = data
		},
		set_business_profile(state, data) {
			state.business_profile = data
		},
		set_billing_details(state, data) {
			state.billing_details = data
		},
		set_stripe_data(state, data) {
			state.stripe= data
		},
		set_payment_methods(state, data) {
			state.payment_methods = data
		},
		set_invoices(state, data) {
			state.invoices = data
		},
		set_guest_welcome_message(state, guestWelcomeMessage) {
			state.guest_welcome_message = guestWelcomeMessage
		},
		set_logo(state, data) {
			if (data.logo) {
				if (data.level === 'business') {
					state.logo = data.logo
					state.business_logo = data.logo
				} else {
					state.logo = data.logo
					state.business_logo = 'img/logo.svg'
				}
			} else {
				state.logo = 'img/logo.svg'
				state.business_logo = 'img/logo.svg'
			}
		}
	},
	actions: {
		setLoadingStatus({commit}, status) {
			commit('set_status', status)
		},
		login({commit, dispatch}, user) {
			return new Promise((resolve, reject) => {
				commit('auth_request')
				axios({url: '/login', data: user, method: 'POST'})
					.then(resp => {
						const token = resp.data.token
						const expires = resp.data.expires
            let curDate = new Date()
            curDate.setMinutes(curDate.getMinutes() + parseInt(expires))
            let expired_in = curDate.getTime()

            localStorage.setItem('token', token)
            localStorage.setItem('expired_in', expired_in)

						axios.defaults.headers.common['Authorization'] = 'Bearer ' + token

						setTimeout(() => {
							dispatch('refreshToken')
						}, (expires-5) * 60 * 1000)
            commit('auth_success', token, user, expired_in)
						resolve(resp)
					})
					.catch(err => {
						commit('auth_error')
						localStorage.removeItem('token')
						localStorage.removeItem('expired_in')
						reject(err)
					})
				})
		},
		refreshToken({commit, dispatch}) {
			console.log('refresh token')
			console.log(localStorage.getItem('expired_in'))
			axios({url: '/refresh-token', method: 'POST'})
				.then(resp => {
					const token = resp.data.token
					const expires = parseInt(resp.data.expires)
					let curDate = new Date()
					curDate.setMinutes(curDate.getMinutes() + expires)
					let expired_in = curDate.getTime()

					localStorage.setItem('token', token)
					localStorage.setItem('expired_in', expired_in)

					axios.defaults.headers.common['Authorization'] = 'Bearer ' + token

					setTimeout(() => {
						dispatch('refreshToken')
					}, (expires-5) * 60 * 1000)
					commit('auth_success', token, {}, expired_in)
					console.log(token)
				})
				.catch(err => {
					console.log(err)
					localStorage.removeItem('token')
					localStorage.removeItem('expired_in')
					commit('auth_error')
				})
		},
		register({commit ,dispatch}, user) {
			return new Promise((resolve, reject) => {
				commit('auth_request')
				axios({url: '/register', data: user, method: 'POST'})
					.then(resp => {
						const token = resp.data.token
						const expires = resp.data.expires
            let curDate = new Date()
            curDate.setMinutes(curDate.getMinutes() + parseInt(expires))
            let expired_in = curDate.getTime()

            localStorage.setItem('token', token)
            localStorage.setItem('expired_in',curDate.getTime())

						axios.defaults.headers.common['Authorization'] = 'Bearer ' + token

						setTimeout(() => {
							dispatch('refreshToken')
						}, (expires-5) * 60 * 1000)
            commit('auth_success', token, {}, expired_in)
						resolve(resp)
					})
					.catch(err => {
						commit('auth_error', err)
						localStorage.removeItem('token')
						localStorage.removeItem('expired_in')
						reject(err)
					})
				})
		},
		logout({ commit }) {
			return new Promise((resolve, reject) => {
				commit('auth_request')
				axios({url: '/logout', method: 'POST'})
					.then(resp => {
						commit('logout')
						localStorage.removeItem('token')
						localStorage.removeItem('expired_in')
						delete axios.defaults.headers.common['Authorization']
						resolve(resp)
					})
					.catch(err => {
						commit('auth_error', err)
						localStorage.removeItem('token')
						localStorage.removeItem('expired_in')
						delete axios.defaults.headers.common['Authorization']
						reject(err)
					})
				})
		},
		logouts({commit}) {
			commit('logout')
			localStorage.removeItem('token')
			localStorage.removeItem('expired_in')
			delete axios.defaults.headers.common['Authorization']
		},
		emailVerify({ commit }, code) {
			return new Promise((resolve, reject) => {
				commit('auth_request')
				axios({url: `/email/verify/${code}` , method: 'POST'})
					.then(resp => {
						commit('email_verify')
						resolve(resp)
					})
					.catch(err => {
						commit('auth_error', err)
						reject(err)
					})
				})
		},
		resetPassword({commit}, payload) {
			return new Promise((resolve, reject) => {
				commit('auth_request')
				axios({url: '/forgot-password', data: payload, method: 'POST'})
					.then(resp => {
						commit('auth_success')
						resolve(resp)
					})
					.catch(err => {
						commit('auth_error', err)
						reject(err)
					})
				})
		},
		changePassword({commit}, payload) {
			return new Promise((resolve, reject) => {
				commit('auth_request')
				let param = {
					password: payload.password,
					password_confirmation: payload.password_confirmation
				}
				axios({url: `/reset-password/${payload.code}`, data: param, method: 'POST'})
					.then(resp => {
						commit('auth_success')
						resolve(resp)
					})
					.catch(err => {
						commit('auth_error', err)
						reject(err)
					})
				})
		},
		getUserProfile({ commit }) {
			return new Promise((resolve, reject) => {
				commit('set_status', 'loading')
				axios({url: '/profile', method: 'GET'})
					.then(resp => {
						const user = resp.data
						commit('set_user_profile', user)
						commit('set_logo', {logo: user.meeting_room.brand.logo, level: user.meeting_room.brand.level})
						commit('set_status', 'success')
						resolve(resp)
					})
					.catch(err => {
						commit('set_status', 'error')
						reject(err)
					})
				})
		},
		updateProfile({commit}, payload) {
			return new Promise((resolve, reject) => {
				commit('set_status','loading')
				axios({url: '/profile', data: payload, method: 'PATCH'})
					.then(resp => {
						commit('update_profile', payload)
						commit('set_status','success')
						resolve(resp)
					})
					.catch(err => {
						commit('set_status','error')
						reject(err)
					})
				})
		},
		updateCredentials({commit}, payload) {
			return new Promise((resolve, reject) => {
				commit('set_status','loading')
				axios({url: '/credentials', data: payload, method: 'PATCH'})
					.then(resp => {
						commit('update_credentials', payload)
						commit('set_status','success')
						resolve(resp)
					})
					.catch(err => {
						commit('set_status','error')
						reject(err)
					})
				})
		},
		updateRoomId({commit}, payload) {
			return new Promise((resolve, reject) => {
				commit('set_status','loading')
				axios({url: '/personal-meeting-room-aliases', data: payload, method: 'PATCH'})
					.then(resp => {
						commit('update_room_id', payload)
						commit('set_status','success')
						resolve(resp)
					})
					.catch(err => {
						commit('set_status','error')
						reject(err)
					})
				})
		},
		getSettings({ commit }) {
			return new Promise((resolve, reject) => {
				commit('set_status', 'loading')
				axios({url: '/settings', method: 'GET'})
					.then(resp => {
						commit('set_settings', resp.data)
						commit('set_status', 'success')
            resolve(resp)
          })
					.catch(err => {
						commit('set_status', 'error')
						reject(err)
					})
				})
		},
		updateMeetingSettings({commit}, payload) {
			return new Promise((resolve, reject) => {
				commit('set_status','loading')
				axios({url: '/settings', data: payload, method: 'PATCH'})
					.then(resp => {
						commit('update_meeting_settings', payload)
						commit('set_status','success')
						resolve(resp)
					})
					.catch(err => {
						commit('set_status','error')
						reject(err)
					})
				})
		},
		updateEmailSettings({commit}, payload) {
			return new Promise((resolve, reject) => {
				commit('set_status','loading')
				axios({url: '/settings', data: payload, method: 'PATCH'})
					.then(resp => {
						commit('update_email_settings', payload)
						commit('set_status','success')
						resolve(resp)
					})
					.catch(err => {
						commit('set_status','error')
						reject(err)
					})
				})
		},
		updatePasswordSettings({commit}, payload) {
			return new Promise((resolve, reject) => {
				commit('set_status','loading')
				axios({url: '/settings', data: payload, method: 'PATCH'})
					.then(resp => {
						commit('update_password_settings')
						commit('set_status','success')
						resolve(resp)
					})
					.catch(err => {
						commit('set_status','error')
						reject(err)
					})
				})
		},
		getPersonalBrand({ commit }) {
			return new Promise((resolve, reject) => {
				commit('set_status', 'loading')
				axios({url: '/personal-brand', method: 'GET'})
					.then(resp => {
						commit('set_personal_brand', resp.data)
						commit('set_status', 'success')
						resolve(resp)
					})
					.catch(err => {
						commit('set_status', 'error')
						reject(err)
					})
				})
		},
		getBusinessBrand({ commit }) {
			return new Promise((resolve, reject) => {
				commit('set_status', 'loading')
				axios({url: '/business-brand', method: 'GET'})
					.then(resp => {
						commit('set_business_brand', resp.data)
						commit('set_status', 'success')
						resolve(resp)
					})
					.catch(err => {
						commit('set_status', 'error')
						reject(err)
					})
			})
		},
		updatePersonalBrand({commit, dispatch}, payload) {
			return new Promise((resolve, reject) => {
				commit('set_status', 'loading')
				axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
				axios({url: '/personal-brand', data: payload, method: 'POST'})
					.then(resp => {
						console.log(resp)
						commit('set_status', 'success')
						axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
						dispatch('getPersonalBrand')
						resolve(resp)
					})
					.catch(err => {
						commit('set_status', 'error')
						axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
						reject(err)
					})
				})
		},
		updateBrandInfo({commit}, payload) {
			return new Promise((resolve, reject) => {
				commit('set_status', 'loading')
				axios({url: '/business-brand', data: payload, method: 'POST'})
					.then(resp => {
						console.log(resp)
						commit('update_business_brand_info', payload)
						commit('set_status', 'success')
						resolve(resp)
					})
					.catch(err => {
						commit('set_status', 'error')
						reject(err)
					})
				})
		},
		updateBrandColors({commit}, payload) {
			return new Promise((resolve, reject) => {
				commit('set_status', 'loading')
				axios({url: '/business-brand', data: payload, method: 'POST'})
					.then(resp => {
						console.log(resp)
						commit('update_business_brand_colors', payload)
						commit('set_status', 'success')
						resolve(resp)
					})
					.catch(err => {
						commit('set_status', 'error')
						reject(err)
					})
				})
		},
		updateBrandImages({commit, dispatch}, payload) {
			return new Promise((resolve, reject) => {
				commit('set_status', 'loading')
				axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
				axios({url: '/business-brand', data: payload, method: 'POST'})
					.then(resp => {
						console.log(resp)
						commit('set_status', 'success')
						axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
						dispatch('getBusinessBrand')
						resolve(resp)
					})
					.catch(err => {
						commit('set_status', 'error')
						axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
						reject(err)
					})
				})
		},
		validateInvite({commit}, code) {
			return new Promise((resolve, reject) => {
				commit('set_status', 'loading')
				axios({url: `/validate-invite/${code}`, method: 'GET'})
					.then(resp => {
						commit('set_status', 'success')
						resolve(resp)
					})
					.catch(err => {
						commit('set_status', 'error')
						reject(err)
					})
				})
		},
		registerViaInvite({commit, dispatch}, payload) {
			return new Promise((resolve, reject) => {
				commit('auth_request')
				axios({url: `/register-via-invite/${payload.code}`, data: payload, method: 'POST'})
					.then(resp => {
						const token = resp.data.token
						const expires = resp.data.expires
            let curDate = new Date()
            curDate.setMinutes(curDate.getMinutes() + parseInt(expires))
            let expired_in = curDate.getTime()

            localStorage.setItem('token', token)
            localStorage.setItem('expired_in',curDate.getTime())

						axios.defaults.headers.common['Authorization'] = 'Bearer ' + token

						setTimeout(() => {
							dispatch('refreshToken')
						}, (expires-5) * 60 * 1000)
            commit('auth_success', token, {}, expired_in)
						resolve(resp)
					})
					.catch(err => {
						commit('auth_error', err)
						localStorage.removeItem('token')
						localStorage.removeItem('expired_in')
						reject(err)
					})
				})			
		},
		setPrevRoute({commit}, prevRoute) {
			commit('set_prev_route', prevRoute)
		},
		getBusinessProfile({commit}) {
			return new Promise((resolve, reject) => {
				commit('set_status', 'loading')
				axios({url: '/business-profile', method: 'GET'})
					.then(resp => {
						commit('set_business_profile', resp.data)
						commit('set_status', 'success')
						resolve(resp)
					})
					.catch(err => {
						commit('set_status', 'error')
						reject(err)
					})
				})
		},
		updateBusinessProfile({commit}, payload) {
			return new Promise((resolve, reject) => {
				commit('set_status', 'loading')
				axios({url: '/business-profile', data: payload, method: 'PATCH'})
					.then(resp => {
						commit('set_status', 'success')
						resolve(resp)
					})
					.catch(err => {
						commit('set_status', 'error')
						reject(err)
					})
				})
		},
		getBillingDetails({commit}) {
			return new Promise((resolve, reject) => {
				commit('set_status', 'loading')
				axios({url: '/billing-details', method: 'GET'})
					.then(resp => {
						commit('set_billing_details', resp.data)
						commit('set_status', 'success')
						resolve(resp)
					})
					.catch(err => {
						commit('set_status', 'error')
						reject(err)
					})
				})
		},
		updateBillingDetails({commit}, payload) {
			return new Promise((resolve, reject) => {
				commit('set_status', 'loading')
				axios({url: '/billing-details', data: payload, method: 'PATCH'})
					.then(resp => {
						commit('set_status', 'success')
						resolve(resp)
					})
					.catch(err => {
						commit('set_status', 'error')
						reject(err)
					})
				})
		},
		getStripeData({commit}) {
			return new Promise((resolve, reject) => {
				// @todo for some reason "loading" here causes maximum call stack exception
				// commit('set_status', 'loading')
				axios({url: '/payments/form', method: 'GET'})
					.then(resp => {
						commit('set_stripe_data', resp.data)
						commit('set_status', 'success')
						resolve(resp)
					})
					.catch(err => {
						commit('set_status', 'error')
						reject(err)
					})
				})
		},
		getPaymentMethods({commit}) {
			return new Promise((resolve, reject) => {
				commit('set_status', 'loading')
				axios({url: '/payment-methods', method: 'GET'})
					.then(resp => {
						commit('set_payment_methods', resp.data)
						commit('set_status', 'success')
						resolve(resp)
					})
					.catch(err => {
						commit('set_status', 'error')
						reject(err)
					})
				})
		},
		savePaymentMethods({commit}, payload) {
			return new Promise((resolve, reject) => {
				commit('set_status', 'loading')
				axios({url: '/payment-methods', data: payload, method: 'POST'})
					.then(resp => {
						commit('set_status', 'success')
						resolve(resp)
					})
					.catch(err => {
						commit('set_status', 'error')
						reject(err)
					})
				})
		},		
		deletePaymentMethods({commit}, payment_id) {
			return new Promise((resolve, reject) => {
				commit('set_status', 'loading')
				axios({url: `/payment-methods/${payment_id}`, method: 'DELETE'})
					.then(resp => {
						commit('set_status', 'success')
						resolve(resp)
					})
					.catch(err => {
						commit('set_status', 'error')
						reject(err)
					})
				})
		},
		setDefaultPayment({commit}, payment_id) {
			return new Promise((resolve, reject) => {
				commit('set_status', 'loading')
				axios({url: '/payment-methods/set-default', data: {payment_method: payment_id}, method: 'POST'})
					.then(resp => {
						commit('set_status', 'success')
						resolve(resp)
					})
					.catch(err => {
						commit('set_status', 'error')
						reject(err)
					})
				})
		},
		getInvoices({commit}, url) {
			return new Promise((resolve, reject) => {
				commit('set_status', 'loading')
				axios({url: `/invoices${url}`, method: 'GET'})
					.then(resp => {
						commit('set_invoices', resp.data)
						commit('set_status', 'success')
						resolve(resp)
					})
					.catch(err => {
						commit('set_status', 'error')
						reject(err)
					})
				})
		},
		setGuestWelcomeMessage({commit}, guestWelcomeMessage) {
			commit('set_guest_welcome_message', guestWelcomeMessage)
		},
		setLogo({commit}, payload) {
			commit('set_logo', payload)
		}
	},
	getters: {
		isLoggedIn: state => !!state.token,
		authStatus: state => state.status,
	}
}
