import Vue from 'vue'

const headers = {}
const _token = Vue.store.state.user.token || null

if (_token !== null) {
  headers.Authorization = `Bearer ${_token}`
}

export default {
  get (url) {
    return Vue.http.get(url, {
      headers
    })
  },
  post (url) {
    return Vue.http.post(url)
  }
}
