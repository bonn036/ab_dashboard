import request from '@/utils/request'

export function getList() {
  return request({
    url: '/project/list',
    method: 'get',
    params
  })
}
