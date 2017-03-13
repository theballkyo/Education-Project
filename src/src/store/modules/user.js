import * as types from '../mutation-types'
import { user } from '../storageHelper'
import api from '@/api/'
import jwtDecode from 'jwt-decode'

const state = {
  profile: user.profile || {},
  token: user.token || null,
  lastUpdate: user.lastUpdate,
  isLoginRequest: false,
  isLoggedIn: user.isLoggedIn || false,
  error: null
}

const getters = {
  isLoggedIn: state => state.isLoggedIn,
  isLoginRequest: state => state.isLoginRequest
}

const actions = {
  async loginRequest ({ commit, state }, credentials) {
    commit(types.LOGIN_REQUEST)
    try {
      const rawData = await api.auth.authenticate(credentials)
      const body = rawData.body
      if (body.error) {
        commit(types.LOGIN_FAILED, body.error)
      } else {
        const token = body.token
        const profile = jwtDecode(token)
        commit(types.LOGIN_USER, {token, profile})
      }
    } catch (e) {
      commit(types.LOGIN_FAILED, `Can't connect to a server. or Token invalid.`)
    }
    commit(types.LOGIN_REQUEST_END)
  },
  async logoutRequest ({ commit }) {
    // await authAPI.logout()
    commit(types.LOGOUT_USER)
  },
  async updateProfile ({ commit }, newProfile) {
    // Todo.
    // commit(await authAPI.updateProfile(newProfile))
  }
}

const mutations = {
  [types.LOGIN_USER] (state, {token, profile}) {
    state.profile = profile
    state.token = token
    state.isLoggedIn = true
  },
  [types.LOGOUT_USER] (state) {
    state.isLoggedIn = false
    state.profile = {}
    state.token = null
    state.isLoginRequest = false
  },
  [types.LOGIN_FAILED] (state, e = 'Can\'t login') {
    state.isLoggedIn = false
    state.error = e
  },
  [types.LOGIN_REQUEST] (state) {
    state.isLoginRequest = true
  },
  [types.LOGIN_REQUEST_END] (state) {
    state.isLoginRequest = false
  }
}
export default {
  // namespaced: true,
  state,
  getters,
  actions,
  mutations
}
