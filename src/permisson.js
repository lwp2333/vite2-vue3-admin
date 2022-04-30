import Router from '@/router'
import asyncRoutes from '@/router/asyncRoutes'

console.log(asyncRoutes)
asyncRoutes.forEach(item => {
  Router.addRoute('app', item)
})
