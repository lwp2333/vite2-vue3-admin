// 导入模块
// import dashBoard from './modules/dashBoard'
// import form from './modules/form'
// import table from './modules/table'
// import setting from './modules/setting'
// import multiLevelMenu from './modules/multiLevelMenu'
// import exampleCenter from './modules/exampleCenter'

const modules = import.meta.globEager('./modules/*.js')
const map = []
Object.keys(modules).forEach(file => {
  map.push(modules[file].default)
})

// const asyncRoutes = [dashBoard, form, table, setting, exampleCenter, multiLevelMenu]
const asyncRoutes = [...map]
export default asyncRoutes
