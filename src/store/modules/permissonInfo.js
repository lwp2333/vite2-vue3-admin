const state = {
  menu: [
    {
      name: 'main',
      path: '/main',
    },
  ],
}
const mutations = {
  setMenu(state, value) {
    state.menu = value
  },
}
const actions = {}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
