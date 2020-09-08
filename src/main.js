import Vue from 'vue'
import Axios from 'axios'
import App from './App.vue'
import router from './router'
import VueObserveVisibility from 'vue-observe-visibility'
import store from './store'

import VueToast from 'vue-toast-notification'
import VTooltip from 'v-tooltip'
import VueMoment from 'vue-moment'

import 'bootstrap'
// import 'bootstrap-datepicker'
import '@/assets/scss/app.scss'
import 'vue-toast-notification/dist/index.css'
import DatePicker from 'v-calendar/lib/components/date-picker.umd'

window.$ = window.jQuery = require('jquery');
//import '@/assets/js/custom.js'
 
Vue.use(VueToast, {	position: 'bottom-right', duration:5000 });
Vue.use(VTooltip)
Vue.use(VueMoment)
Vue.use(VueObserveVisibility)
Vue.component('date-picker', DatePicker)

Vue.config.productionTip = false

Vue.prototype.$http = Axios;
const token = localStorage.getItem('token');
const API_URL = process.env.API_URL || 'https://simply-video.staging.netcore.lv/api/'

Vue.prototype.$http.defaults.baseURL = API_URL
Vue.prototype.$http.defaults.headers.post['Accept'] = 'application/json';
Vue.prototype.$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// Vue.prototype.$http.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';
if (token) {
	Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.token
}

let handleOutsideClick
Vue.directive('click-outside', {
	bind (el, binding, vnode) {
		handleOutsideClick = (e) => {
			e.stopPropagation()
			const { handler, exclude } = binding.value
			let clickedOnExcludedEl = false
			exclude.forEach(refName => {
				if (!clickedOnExcludedEl) {
					const excludedEl = vnode.context.$refs[refName]
					clickedOnExcludedEl = excludedEl && excludedEl.contains(e.target)
				}
			})
			if (!el.contains(e.target) && !clickedOnExcludedEl) {
				vnode.context[handler]()
			}
		}
		document.addEventListener('click', handleOutsideClick)
		document.addEventListener('touchstart', handleOutsideClick)
	},
	unbind () {
		document.removeEventListener('click', handleOutsideClick)
		document.removeEventListener('touchstart', handleOutsideClick)
	}
})

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
