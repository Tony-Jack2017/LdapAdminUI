import instance from '../../common/request'

export interface GetMenuListParams {
    active: number,
    type: number,
    page?: number,
    size?: number,
}

export function getMenuList (params: GetMenuListParams) {
  return instance({
    method: 'GET',
    url: '/request/menu/list',
    params
  })
}
