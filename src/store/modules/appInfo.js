const state = {
  // 抽屉是否打开
  drawerStatus: false,
}
const mutations = {
  SET_drawerStatus(state, val) {
    state.drawerStatus = val
  },
}
const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
