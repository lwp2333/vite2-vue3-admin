import { routesToMenuTree } from '@/utils'
import asyncRoutes from '@/router/asyncRoutes'
const state = {
  // 菜单列表
  menuList: routesToMenuTree(asyncRoutes),
  // 当前展开菜单项目
  menuOpenKeys: [],
  // 当前选中菜单
  menuSelectedKeys: [],
}
const mutations = {
  SET_menuList(state, val) {
    state.menuList = val
  },
  SET_openKeys(state, val) {
    state.menuOpenKeys = val
  },
  SET_selectedKeys(state, val) {
    state.menuSelectedKeys = val
  },
}
const actions = {
  generateMenu({ state, commit }, authMenu) {
    commit('SET_menuList', authMenu)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
