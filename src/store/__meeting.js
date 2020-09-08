import axios from 'axios'
export default {
  state: {
		upcoming_meetings: [],
		previous_meetings: [],
		sel_meeting: '',
		recordings: [],
		recordings_storage: {},
  },
  mutations: {
    set_upcoming_meetings_data(state, data) {
			state.upcoming_meetings = data
			// state.upcoming_meetings.data.sort((a, b) => (a.starts_at > b.starts_at) ? 1 : -1)
    },
    empty_upcoming_meetings_data(state) {
      state.upcoming_meetings = ''
		},
		set_previous_meetings_data(state, data) {
			state.previous_meetings = data
			// state.previous_meetings.data.sort((a, b) => (a.starts_at < b.starts_at) ? 1 : -1)
    },
    empty_previous_meetings_data(state) {
      state.previous_meetings = ''
		},
		set_sel_meeting(state, data) {
			state.sel_meeting = data
		},
		empty_recording_data(state) {
			state.recordings = []
		},
		set_recording_data(state, data) {
			state.recordings = data
		},
		set_recordings_storage_data(state, data) {
			state.recordings_storage = data
		}
  },
  actions: {
    getUpcomingMeetingsData({ commit }, page_num) {
			commit('empty_upcoming_meetings_data')
			commit('set_status', 'loading')
			return new Promise((resolve, reject) => {
				let url='/meetings'
				if (page_num) {
					url += `?page=${page_num}`
				}
				axios({ url: url, method: 'GET' })
					.then(response => {
						if (response.status === 200) {
							commit('set_upcoming_meetings_data',response.data)
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
		getPreviousMeetingsData({commit}, param) {
			commit('empty_previous_meetings_data')
			commit('set_status', 'loading')
			return new Promise((resolve, reject) => {
				axios({ url: `/meetings?descending_order=1&page=${param.page_num}&from_date=${param.from_date}&to_date=${param.to_date}`, method: 'GET' })
					.then(response => {
						if (response.status === 200) {
							commit('set_previous_meetings_data',response.data)
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
		addMeeting({commit}, param) {
			return new Promise((resolve, reject) => {
				commit('set_status','loading')
				axios({ url: '/meetings', data: param, method: 'POST' })
					.then(response => {
            // console.log(response)
						if (response.status === 201) {
							commit('set_sel_meeting', response.data)
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
		getMeeting({commit}, id) {
			commit('set_sel_meeting', {})	
			return new Promise((resolve, reject) => {
				commit('set_status','loading')
				axios({ url: `/meetings/${id}`, method: 'GET' })
					.then(response => {
            // console.log(response)
						commit('set_sel_meeting', response.data)
						commit('set_status', 'success')
						resolve(response)
					})
					.catch(err => {
						commit('set_status','error')
						reject(err)
					})
				})
		},
		updateMeeting({commit}, param) {
			return new Promise((resolve, reject) => {
				commit('set_status','loading')
				axios({ url: `/meetings/${param.id}`, data: param, method: 'PATCH' })
					.then(response => {
            // console.log(response)
						// if (response.status === 204) {
						// 	commit('set_sel_meeting', response.data)
						// }
						commit('set_status', 'success')
						resolve(response)
					})
					.catch(err => {
						commit('set_status','error')
						reject(err)
					})
				})
		},
		deleteMeeting({commit, dispatch}, id) {
			console.log(id)
			return new Promise((resolve, reject) => {
				commit('set_status','loading')
				axios({ url: `/meetings/${id}`, method: 'DELETE' })
					.then(response => {
            console.log(response)
						dispatch('getUpcomingMeetingsData')
						resolve(response)
					})
					.catch(err => {
						commit('set_status','error')
						reject(err)
					})
				})
		},
		getRecordings({commit}, page_num) {
			return new Promise((resolve, reject) => {
				commit('set_status','loading')
				let url = '/recordings'
				if (page_num) {
					url += `?page=${page_num}`
				}
				axios({url: url, method: 'GET'})
					.then(response => {
						if (response.status === 200) {
							// console.log(response.data.data)
							commit('set_recording_data', response.data)
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
		getRecordingsStorage({commit}) {
			return new Promise((resolve, reject) => {
				axios({url: '/recordings/storage', method: 'GET'})
					.then(response => {
						commit('set_recordings_storage_data', response.data)
						resolve(response)
					})
					.catch(err => {
						commit('set_status', 'error')
						reject(err)
					})
			})
		},
		deleteRecording({commit, dispatch}, id) {
			return new Promise((resolve, reject) => {
				commit('set_status','loading')
				axios({ url: `/recordings/${id}`, method: 'DELETE' })
					.then(response => {
            // console.log(response)
						if (response.status === 204) {
							dispatch('getRecordings')
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
		sendInvite({commit}, payload) {
			return new Promise((resolve, reject) => {
				commit('set_status','loading')
				console.log(payload)
				axios({ url: '/invite', data: payload, method: 'POST' })
					.then(response => {
						commit('set_status', 'success')
						resolve(response)
					})
					.catch(err => {
						commit('set_status','error')
						reject(err)
					})
				})
		},
		directAccess({commit}, code) {
			return new Promise((resolve, reject) => {
				commit('set_status','loading')
				axios({ url: `/direct-access/${code}`, method: 'GET' })
					.then(response => {
						commit('set_status', 'success')
						resolve(response)
					})
					.catch(err => {
						commit('set_status','error')
						reject(err)
					})
				})
		}
  },
}

