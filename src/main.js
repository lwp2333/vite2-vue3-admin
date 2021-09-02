import { createApp } from 'vue'
import App from './App.vue'
import Router from './router'
import Store from './store'
import 'normalize.css' // 样式重置各浏览器统一
import './styles/nprogress.less'
import './styles/global.less' // 全局样式
import Antd from 'ant-design-vue'
import './styles/theme.less' // ant 主题Y样式
import './permisson' // 权限
import * as AntIcon from '@ant-design/icons-vue' // 全局图标
import components from './components/global' // 全局组件
import directives from './directives' // 全局指令
import 'moment/dist/locale/zh-cn'
const app = createApp(App)
app.config.productionTip = false
// 注册全局组件
for (const i in components) {
  app.component(i, components[i])
}
// 注册全部图标
for (const i in AntIcon) {
  const whiteList = ['createFromIconfontCN', 'getTwoToneColor', 'setTwoToneColor', 'default']
  if (!whiteList.includes(i)) {
    app.component(i, AntIcon[i])
  }
}
// 注册全局指令
for (const i in directives) {
  app.directive(i, directives[i])
}
app.use(Antd).use(Router).use(Store).mount('#app')
