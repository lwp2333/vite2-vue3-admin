const getters = {
  menuList: state => state.menuInfo.menuList,
  menuOpenKeys: state => state.menuInfo.menuOpenKeys,
  menuSelectedKeys: state => state.menuInfo.menuSelectedKeys,
  drawerStatus :state => state.appInfo.drawerStatus,
}
export default getters
