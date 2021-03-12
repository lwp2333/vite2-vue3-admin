const dashBoard = {
  path: 'dashBoard',
  name: 'dashBoard',
  meta: {
    title: '工作台',
    icon: 'PieChartTwoTone',
  },
  component: () => import('@/views/dashboard/index.vue'),
}
export default dashBoard
