const exampleCenter = {
  path: 'exampleCenter',
  name: 'exampleCenter',
  meta: {
    title: '示例中心',
    icon: 'AppstoreTwoTone',
  },
  component: () => import('@/views/exampleCenter/index.vue'),
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
  ],
}
export default exampleCenter
