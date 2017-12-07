// 非权限接口
import axios from 'axios'
// axios.defaults.withCredentials = true // 表示跨域请求时是否需要使用凭证
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.timeout = 8000
// 权限接口
function _fetch (options) {
  axios.defaults.baseURL = 'http://localhost:3000/auth/' // 本机服务器
  return new Promise((resolve, reject) => {
    const instance = axios.create()
    instance.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')
    instance(options).then(response => {
      resolve(response)
    }).catch(error => {
      console.log(error) // for debug
      reject(error)
    })
  })
}
// 非权限接口
function fetch (options) {
  axios.defaults.baseURL = 'http://localhost:3000/api/' // 本机服务器
  return new Promise((resolve, reject) => {
    const instance = axios.create()
    instance(options).then(response => {
      resolve(response)
    }).catch(error => {
      console.log(error) // for debug
      reject(error)
    })
  })
}

export function _apiPost (uri, obj) {
  return _fetch({
    url: uri,
    method: 'post',
    data: obj
  })
}

export function _apiGet (uri, obj) {
  return _fetch({
    url: uri,
    method: 'get',
    data: obj
  })
}
/* 以下为不需要权限的请求方法 */
export function apiPost (uri, obj) {
  return fetch({
    url: uri,
    method: 'post',
    data: obj
  })
}

export function apiGet (uri, obj) {
  return fetch({
    url: uri,
    method: 'get',
    params: obj
  })
}
