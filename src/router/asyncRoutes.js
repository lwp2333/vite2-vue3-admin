// 导入模块
const modules = import.meta.globEager('./modules/*.js')
const asyncRoutes = []
Object.keys(modules).forEach(file => {
  asyncRoutes.push(modules[file].default)
})

export default asyncRoutes
