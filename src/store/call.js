const state = {
  camera: ''
}

const mutations = {
  setCamera (state, value) {
    state.camera = value
  }
}

export default {
  state,
  mutations,
  namespaced: true
}