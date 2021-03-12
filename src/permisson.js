import Router from '@/router'
import asyncRoutes from '@/router/asyncRoutes'

asyncRoutes.forEach(item => {
  Router.addRoute('app', item)
})
