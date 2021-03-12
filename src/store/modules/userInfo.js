const userInfo = {
  namespaced: true,
  state: () => ({
    author: {
      name: 'lwp',
    },
  }),
  mutations: {
    setAuth(state, value) {
      state.author = value
    },
  },
  actions: {},
}

export default userInfo
