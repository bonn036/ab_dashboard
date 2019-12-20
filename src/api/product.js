import request from '@/utils/request'

export function getList() {
  return request({
    url: '/product/list',
    method: 'get',
  })
}

export function getInfo(params) {
  return request({
    url: '/product/info?id=',
    method: 'get',
    params
  })
}
