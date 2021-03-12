import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { createRouter, createWebHashHistory } from 'vue-router'
import { getAccessToken, getRefreshToken } from '@/utils/auth'

const Router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return { ...savedPosition, behavior: 'smooth' }
    } else {
      return { x: 0, y: 0, behavior: 'smooth' }
    }
  },
  routes: [
    {
      path: '/login',
      name: 'login',
      meta: {
        title: '登录',
      },
      component: () => import('@/views/login/index.vue'),
    },
    {
      path: '/',
      name: 'app',
      meta: {
        title: '主页',
      },
      redirect: '/dashBoard',
      component: () => import('@/layout/index.vue'),
    },
    {
      path: '/notFound',
      name: 'notFound',
      component: () => import('@/views/notFound/index.vue'),
      meta: {
        title: '找不到路径',
      },
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/notFound',
    },
  ],
})
NProgress.configure({ showSpinner: false })
Router.beforeEach((to, from) => {
  NProgress.start()
  // 判断是否登录状态
  const accessToken = getAccessToken()
  const refreshToken = getRefreshToken()
  const isValid = Boolean(accessToken && refreshToken)
  // 去登录页
  if (to.path === '/login') {
    // 已经登录 则保存路由不变
    if (isValid) {
      return from
    }
    // 未登录，则去登录页
    document.title = to.meta.title
    return true
  }
  // 不是去登录，
  if (isValid) {
    // 已登录状态
    document.title = to.meta.title
    return true
  }
  // 未登录 跳转登录
  return { path: '/login' }
})

Router.afterEach((to, from) => {
  NProgress.done()
})

export default Router
