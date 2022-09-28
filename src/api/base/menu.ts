import instance from '../../common/request'

export interface GetMenuListParams {
    active: number
    type: number
    page?: number
    size?: number
}

export interface ModifyMenuData {
    id: number
    type: number
    old_path: string
    name?: string
    path?: string
    description?: string
    status?: number
}

export interface AddMenuData {
    name: string
    path: string
    parent_id: number
    description: string
}

export function getMenuList (params: GetMenuListParams) {
  return instance({
    method: 'GET',
    url: '/request/system/menu/list',
    params
  })
}

export function modifyMenu (data: ModifyMenuData) {
  return instance({
    method: 'POST',
    url: '/request/system/menu/modify',
    data
  })
}

export function addMenu (data: AddMenuData) {
  return instance({
    method: 'POST',
    url: 'request/system/menu/add',
    data
  })
}
