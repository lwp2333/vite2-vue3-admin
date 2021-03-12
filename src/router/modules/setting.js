const setting = {
  path: 'setting',
  name: 'setting',
  meta: {
    title: '配置中心',
    icon: 'SettingTwoTone',
  },
  redirect: '/setting/menuConfig',
  component: () => import('@/views/setting/index.vue'),
  children: [
    {
      path: 'menuConfig',
      name: 'menuConfig',
      meta: {
        title: '菜单配置',
        icon: 'SettingTwoTone',
      },
      component: () => import('@/views/setting/menuConfig.vue'),
    },
    {
      path: 'permissionConfig',
      name: 'permissionConfig',
      meta: {
        title: '权限配置',
        icon: 'SettingTwoTone',
      },
      component: () => import('@/views/setting/permissionConfig.vue'),
    },
    {
      path: 'roleConfig',
      name: 'roleConfig',
      meta: {
        title: '角色配置',
        icon: 'SettingTwoTone',
      },
      component: () => import('@/views/setting/roleConfig.vue'),
    },
  ],
}
export default setting
