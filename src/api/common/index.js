import request from '@/utils/request'

/** 上传 */
export function upload(data) {
  return request({
    url: '/upload',
    method: 'post',
    data
  })
}

/** 下载 */
export function downloadFile(params) {
  return request.download({
    url: '/downloadFile',
    params
  })
}

/** 验证码 */

export function getSvgCode(data) {
  return request({
    url: '/svgCode',
    method: 'get',
    data
  })
}
