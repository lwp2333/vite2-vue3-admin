const form = {
  path: 'form',
  name: 'form',
  meta: {
    title: '表单',
    icon: 'EditTwoTone',
  },
  redirect: '/form/baseForm',
  component: () => import('@/views/form/index.vue'),
  children: [
    {
      path: 'baseForm',
      name: 'baseForm',
      meta: {
        title: '基础表单',
        icon: 'EditTwoTone',
      },
      component: () => import('@/views/form/baseForm.vue'),
    },
    {
      path: 'stepForm',
      name: 'stepForm',
      meta: {
        title: '步骤表单',
        icon: 'EditTwoTone',
      },
      component: () => import('@/views/form/stepForm.vue'),
    },
    {
      path: 'inlineForm',
      name: 'inlineForm',
      meta: {
        title: '行内表单',
        icon: 'EditTwoTone',
      },
      component: () => import('@/views/form/inlineForm.vue'),
    },
  ],
}
export default form
