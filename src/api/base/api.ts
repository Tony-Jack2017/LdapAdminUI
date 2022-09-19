import instance from '../../common/request'

interface GetApiListParams {
    active: number,
    status?: number
    page?: number,
    size?: number,
}

export function getApiList (params:GetApiListParams) {
  return instance({
    method: 'GET',
    url: 'request/api/list',
    params
  })
}
