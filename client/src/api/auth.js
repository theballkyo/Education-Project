// import Vue from 'vue'
// import { API_URL } from './BaseAPI'
import { AuthResource } from './resource'

// const AUTH_URL = 'http://localhost:3001/user/login'

const authenticate = (credentials) => {
  return AuthResource.save({...credentials})
}

const logout = () => {
  // Todo.
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
