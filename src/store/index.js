import { createStore } from 'vuex'
// modules
import userInfo from './modules/userInfo'
import permissonInfo from './modules/permissonInfo'
import menuInfo from './modules/menuInfo'

// getters、 actions 、 mutations
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const Store = createStore({
  modules: {
    userInfo,
    permissonInfo,
    menuInfo,
  },
  mutations,
  actions,
  getters,
})

export default Store
