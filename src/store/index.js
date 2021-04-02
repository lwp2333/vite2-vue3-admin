import { createStore } from 'vuex'
// modules
// import userInfo from './modules/userInfo'
// import permissonInfo from './modules/permissonInfo'
// import menuInfo from './modules/menuInfo'
// import appInfo from './modules/appInfo'
const modules = import.meta.globEager('./modules/*.js')
const map = {}
Object.keys(modules).forEach(file => {
  const modulesName = file.replace('./modules/', '').replace('.js', '')
  map[modulesName] = modules[file].default
})
// getters、 actions 、 mutations
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const Store = createStore({
  modules: {
    ...map,
    // userInfo,
    // permissonInfo,
    // menuInfo,
    // appInfo,
  },
  mutations,
  actions,
  getters,
})

export default Store
