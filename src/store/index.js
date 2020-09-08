import Vue from 'vue'
import Vuex from 'vuex'
import auth from './__auth'
import billingPlan from './__billingPlan'
import user from './__user'
import meeting from './__meeting'
import call from './call'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    billingPlan,
    user,
    meeting,
    call
  }
})
