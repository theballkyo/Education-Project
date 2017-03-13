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
  let token = store.state.user.token || null
  if (token !== null) {
    request.headers.set('Authorization', `Bearer ${token}`)
  }
  next(response => {
    // if (!response.ok) {
    //   return
    // }
    if (response.status === 401) {
      router.push('/login')
    }
  })
})

export const AuthResource = Vue.resource(API_ROOT + 'user/{/id}')
export const CourseResrouce = Vue.resource(API_ROOT + 'event{/id}')
