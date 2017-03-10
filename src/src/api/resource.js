import Vue from 'vue'
import VueResource from 'vue-resource'
import store from '@/store/'
import router from '@/router/'

// import types from '@/store/mutation-types'
import { API_ROOT } from '@/config'
Vue.use(VueResource)

Vue.http.options.crossOrigin = true
Vue.http.options.credentials = true

Vue.http.interceptors.push((request, next) => {
  store.dispatch('connection/connecting')
  let token = store.state.user.token || null
  if (token !== null) {
    request.headers.set('Authorization', `Bearer ${token}`)
  }
  next(response => {
    // console.log(response)
    if (!response.ok) {
      store.dispatch('connection/fail', 'Connection Failed.')
      return
    }
    store.dispatch('connection/wait')
    if (response.status === 401) {
      store.dispatch('logoutRequest')
      router.push('/login')
    }
  })
})

export const AuthResource = Vue.resource(API_ROOT + 'user/{/id}')
export const CourseResrouce = Vue.resource(API_ROOT + 'event{/id}')
