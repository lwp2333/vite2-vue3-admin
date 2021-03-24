import { createStore } from 'vuex'
// modules
import userInfo from './modules/userInfo'
import permissonInfo from './modules/permissonInfo'
import menuInfo from './modules/menuInfo'
import appInfo from './modules/appInfo'

// getters、 actions 、 mutations
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const Store = createStore({
  modules: {
    userInfo,
    permissonInfo,
    menuInfo,
    appInfo,
  },
  mutations,
  actions,
  getters,
})

export default Store
