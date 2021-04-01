import request from '@/utils/request'

/** 获取角色列表*/
export function getRoleList(params) {
  return request({
    url: '/getRoleList',
    method: 'get',
    params,
  })
}

/** 获取角色列表*/
export function getRoleListByPage(params) {
  return request({
    url: '/getRoleListByPage',
    method: 'get',
    params,
  })
}

/** 获取角色详情*/
export function getRoleDetail(params) {
  return request({
    url: '/getRoleDetail',
    method: 'get',
    params,
  })
}

/** 获取角色菜单详情*/
export function getRoleMenuTree(params) {
  return request({
    url: '/getRoleMenuTree',
    method: 'get',
    params,
  })
}

// 更新角色
export function updateRole(data) {
  return request({
    url: '/updateRole',
    method: 'put',
    data,
  })
}

// 删除角色
export function delRole(data) {
  return request({
    url: '/delRole',
    method: 'delete',
    data,
  })
}

// 添加角色
export function createRole(data) {
  return request({
    url: '/createRole',
    method: 'post',
    data,
  })
}

/** 导出 */
export function exportExcel(params) {
  return request.download({
    url: '/exportExcel',
    params,
  })
}
