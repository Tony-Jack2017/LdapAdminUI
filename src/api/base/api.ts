import instance from '../../common/request'

/* $ api */

interface GetApiListParams {
    active: number
    status?: number
    page?: number
    size?: number
}

export function getApiList (params:GetApiListParams) {
  return instance({
    method: 'GET',
    url: 'request/system/api/list',
    params
  })
}

/* $ api group */

interface GetApiGroupListParams {
    active: number
    status?: number
    page?: number
    size?: number
}

export function getApiGroupList (params:GetApiGroupListParams) {
  return instance({
    method: 'GET',
    url: 'request/system/api/group/list',
    params
  })
}
