const multiLevelMenu = {
  path: 'multiLevelMenu',
  name: 'multiLevelMenu',
  meta: {
    title: '嵌套菜单',
    icon: 'TagsTwoTone',
  },
  redirect: '/multiLevelMenu/level-1',
  component: () => import('@/views/multiLevelMenu/index.vue'),
  children: [
    {
      path: 'level-1',
      name: 'level-1',
      meta: {
        title: '菜单-1',
        icon: 'TagsTwoTone',
      },
      redirect: '/multiLevelMenu/level-1/level-1-1',
      component: () => import('@/views/multiLevelMenu/level-1.vue'),
      children: [
        {
          path: 'level-1-1',
          name: 'level-1-1',
          meta: {
            title: '菜单-1-1',
            icon: 'TagsTwoTone',
          },
          redirect: '/multiLevelMenu/level-1/level-1-1/level-1-1-1',
          component: () => import('@/views/multiLevelMenu/level-1-1.vue'),
          children: [
            {
              path: 'level-1-1-1',
              name: 'level-1-1-1',
              meta: {
                title: '菜单-1-1-1',
                icon: 'TagsTwoTone',
              },
              component: () => import('@/views/multiLevelMenu/level-1-1-1.vue'),
            },
          ],
        },
      ],
    },
  ],
}
export default multiLevelMenu
