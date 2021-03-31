const exampleCenter = {
  path: 'exampleCenter',
  name: 'exampleCenter',
  meta: {
    title: '示例中心',
    icon: 'AppstoreTwoTone',
  },
  component: () => import('@/views/exampleCenter/index.vue'),
  redirect: '/exampleCenter/iconGallery',
  children: [
    {
      path: 'qrCode',
      name: 'qrCode',
      meta: {
        title: '二维码生成',
        icon: 'InteractionTwoTone',
      },
      component: () => import('@/views/exampleCenter/qrCode.vue'),
    },
    {
      path: 'iconGallery',
      name: 'iconGallery',
      meta: {
        title: '图标展示',
        icon: 'InteractionTwoTone',
      },
      component: () => import('@/views/exampleCenter/iconGallery.vue'),
    },
  ],
}
export default exampleCenter
