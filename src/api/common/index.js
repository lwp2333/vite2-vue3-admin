import request from '@/utils/request'

/** 上传 */
export function upload(data) {
  return request({
    url: '/upload',
    method: 'post',
    data,
  })
}

/** 上传 */
export function downloadFile(params) {
  return request.download({
    url: '/downloadFile',
    params,
  })
}
