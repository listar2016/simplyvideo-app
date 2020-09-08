import axios from 'axios'
export default {
  state: {
    plans: [],
    currencies: [],
    roles: [
      { id: 1, display_name: 'Admin', role_name: 'admin' }, 
      { id: 2, display_name: 'Regular user', role_name: 'regular_user'}
    ],
    billing_plans_cnt: [],
    addons: []
  },
  mutations: {
    set_plan_data (state, data) {
      state.plans = data
    },
    set_currency_data (state, data) {
      state.currencies = data
    },
    set_addon_data(state, data) {
      state.addons = data
    }
  },
  actions: {
    getPlanData({commit}) {
      return new Promise((resolve, reject) => {
        axios.get('/billing-plans')
          .then(response => {
            if (response.data) { 
              commit('set_plan_data', response.data)
            }
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getCurrencyData({commit}) {
      return new Promise((resolve, reject) => {
        axios.get('/currencies')
          .then(response => {
            if (response.data) { 
              commit('set_currency_data', response.data) 
            }
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getAddonData ({commit}) {
      return new Promise((resolve, reject) => {
        axios.get('/addons')
          .then(response => {
            if (response.data) { 
              commit('set_addon_data', response.data) 
            }
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
  },
}

