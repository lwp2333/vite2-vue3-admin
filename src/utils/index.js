const generateUUID = () => {
  let d = new Date().getTime()
  if (window.performance && typeof window.performance.now === 'function') {
    d += performance.now() //use high-precision timer if available
  }
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    let r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
  return uuid
}

const routesToMenuTree = (routes = [], parentKey = '/') => {
  const menuTree = []
  routes.forEach((route, index) => {
    let routeChild = []
    const key = parentKey + route.path
    const { children = [], component, meta, ...other } = route
    if (children && children.length) {
      routeChild = routesToMenuTree(children, key + '/')
    }
    if (!meta.hide) {
      if (routeChild.length) {
        menuTree.push({
          key,
          ...other,
          ...meta,
          children: routeChild,
        })
      } else {
        menuTree.push({
          key,
          ...other,
          ...meta,
        })
      }
    }
  })
  return menuTree
}

export { generateUUID, routesToMenuTree }
