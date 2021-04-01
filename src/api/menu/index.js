import request from '@/utils/request'

/** 获取菜单树形数据*/
export function getMenuList(params) {
  return request({
    url: '/getMenuList',
    method: 'get',
    params,
  })
}

/** 获取单个菜单节点详情*/
export function dragDropMenu(data) {
  return request({
    url: '/dragDropMenu',
    method: 'post',
    data,
  })
}

/** 获取单个菜单节点详情*/
export function getMenu(params) {
  return request({
    url: '/getMenu',
    method: 'get',
    params,
  })
}
// 更新单个菜单节点
export function updateMenu(data) {
  return request({
    url: '/updateMenu',
    method: 'put',
    data,
  })
}

// 删除菜单节点

export function delMenu(data) {
  return request({
    url: '/delMenu',
    method: 'delete',
    data,
  })
}
// 获取菜单目录，除去页面树形结构
export function getMenuFolder(params) {
  return request({
    url: '/getMenuFolder',
    method: 'get',
    params,
  })
}

// 添加菜单目录
export function createMenu(data) {
  return request({
    url: '/createMenu',
    method: 'post',
    data,
  })
}
