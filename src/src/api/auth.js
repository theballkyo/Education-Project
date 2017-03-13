import Vue from 'vue'
import { API_URL } from './BaseAPI'

const AUTH_URL = 'http://localhost:3001/user/login'

const authenticate = (body) => {
  return Vue.http.post(AUTH_URL, body)
}

const logout = () => {
  return Vue.http.get(`${API_URL}auth/logout`)
}

const refreshToken = () => {
  // Todo.
}

const updateProfile = (newProfile) => {
  // Todo.
}

export default {
  authenticate,
  logout,
  refreshToken,
  updateProfile
}
