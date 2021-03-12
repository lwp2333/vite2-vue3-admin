const table = {
  path: 'table',
  name: 'table',
  meta: {
    title: '表格',
    icon: 'ProfileTwoTone',
  },
  redirect: '/table/baseTable',
  component: () => import('@/views/table/index.vue'),
  children: [
    {
      path: 'baseTable',
      name: 'baseTable',
      meta: {
        title: '基础表格',
        icon: 'ProfileTwoTone',
      },
      component: () => import('@/views/table/baseTable.vue'),
    },
    {
      path: 'superTable',
      name: 'superTable',
      meta: {
        title: '高级表格',
        icon: 'ProfileTwoTone',
      },
      component: () => import('@/views/table/superTable.vue'),
    },
  ],
}
export default table
