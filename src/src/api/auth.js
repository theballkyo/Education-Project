import Vue from 'vue'
import { API_URL } from './BaseAPI'

const AUTH_URL = 'http://localhost:3001/user/login'

export const authenticate = (body) => {
  return Vue.http.post(AUTH_URL, body)
}

export const logout = () => {
  return Vue.http.get(`${API_URL}auth/logout`)
}

export const refreshToken = () => {
  // Todo.
}

export const updateProfile = (newProfile) => {
  // Todo.
}
