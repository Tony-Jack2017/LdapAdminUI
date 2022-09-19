import axios, { AxiosRequestConfig } from 'axios'
const baseUrl = process.env.REACT_APP_API_URL

console.log(baseUrl)

const instance = axios.create({
  baseURL: baseUrl,
  timeout: 5000
})

instance.interceptors.request.use(
  config => {
    return handleRequestConfig(config)
  },
  err => {
    return Promise.reject(err)
  }
)

instance.interceptors.response.use(
  resp => {
    return Promise.resolve(resp.data)
  },
  err => {
    handleResponseError(err)
  }
)

function handleRequestConfig (config:AxiosRequestConfig):AxiosRequestConfig {
  return config
}

function handleResponseError (err:any): any {
  return err
}

export default instance
