import Vue from 'vue'
// import { app } from '@/main'

// console.log(app)
// Vue.http.interceptors.push((request, next) => {
//   request.headers.set('Authorization', `Bearer ${Vue.state.user.authKey}`)
//   next()
// })
// console.log(Vue.http.get('https://google.com'))
export const API_URL = 'http://localhost:3001/api/v1/'

export default {
  get ({url, headers = {}, body = {}}) {
    return Vue.http.get(API_URL + url)
  },
  post ({url, headers = {}, body = {}}) {
    return Vue.http.post(API_URL + url)
  }
}
