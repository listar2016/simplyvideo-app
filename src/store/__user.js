import axios from 'axios'
export default {
	state: {
		subUsers: [],
	},
	mutations: {
		empty_sub_users(state) {
			state.subUsers = []
		},  
		set_sub_users(state, data) {
			state.subUsers = data
		},
		block_user(state, data) {
			let curUser = state.subUsers.find(item=> item.id === data.id)
			curUser.is_blocked = !data.status
		},
		delete_user(state, id) {
			let delIndex = state.subUsers.findIndex(item => item.id === id)
			state.subUsers.splice(delIndex, 1)
		},
	},
	actions: {
		getSubUsers({ commit }) {
			commit('empty_sub_users')
			return new Promise((resolve, reject) => {
				commit('set_status','loading')
				axios({ url: '/subusers', method: 'GET' })
					.then(response => {
						if (response.status === 200) {
							commit('set_sub_users',response.data.data)
						}
						commit('set_status', 'success')
						resolve(response)
					})
					.catch(err => {
						commit('set_status','error')
						reject(err)
					})
				})
		},
		getSubUser({ commit }, id) {
			return new Promise((resolve, reject) => {
				commit('set_status','loading')
				axios({ url: `/subusers/${id}`, method: 'GET' })
					.then(response => {
						commit('set_status', 'success')
						resolve(response.data)
					})
					.catch(err => {
						commit('set_status','error')
						reject(err)
					})
				})
		},
		blockUser({commit}, payload) {
			let url = `/subusers/block/${payload.id}`
			if (payload.status) url = `/subusers/unblock/${payload.id}`
			return new Promise((resolve, reject) => {
				commit('set_status','loading')
				axios({ url: url, method: 'PATCH' })
					.then(response => {
						if (response.status === 204) {
							commit('block_user', payload)		
							commit('set_status', 'success')
							resolve(response)
						}
						reject(response)
					})
					.catch(err => {
						commit('set_status','error')
						reject(err)
					})
				})
		},
		deleteUser({commit}, payload) {
			return new Promise((resolve, reject) => {
				commit('set_status','loading')
				axios({url: `/subusers/${payload.id}`, method: 'DELETE'})
					.then(response => {
						if (response.status === 204) {
							commit('delete_user', payload.id)
							commit('set_status', 'success')
							resolve(response)
						}
						reject(response)
					})
					.catch(err => {
						commit('set_status','error')
						reject(err)
					})
				})
		},
		addSubUsers({commit, dispatch}, payload) {
			return new Promise((resolve, reject) => {
				commit('set_status','loading')
				let params = {
					billing_plan_id: payload.plan_id,
					emails: payload.emails
				}
				axios({url: `/subusers`, data: params, method: 'POST'})
					.then(response => {
						dispatch('getSubUsers')
						commit('set_status','success')
						resolve(response)
					})
					.catch(err => {
						console.log(err)
						commit('set_status','error')
						reject(err)
					})
				})
		},
		addAddon({commit}, payload) {
			return new Promise((resolve, reject) => {
				commit('set_status','loading')
				let params = {
					addon_id: payload.addon_id
				}
				axios({url: `/subusers/add-addon/${payload.id}`, data: params, method: 'POST'})
					.then(response => {
						commit('add_addon', payload)
						commit('set_status','success')
						resolve(response)
					})
					.catch(err => {
						commit('set_status','error')
						reject(err)
					})
				})
		},
		removeAddon({commit}, payload) {
			return new Promise((resolve, reject) => {
				commit('set_status','loading')
				let params = {
					addon_id: payload.addon_id
				}
				axios({url: `/subusers/remove-addon/${payload.id}`, data: params, method: 'DELETE'})
					.then(response => {
						commit('remove_addon', payload)
						commit('set_status','success')
						resolve(response)
					})
					.catch(err => {
						commit('set_status','error')
						reject(err)
					})
				})
		},
	},
	getters: {
		getUserById: (state) => (id) => {
			return state.subUsers.find( subUser => subUser.id === id)
		},
	}
}

