import * as types from '../mutation-types'
import { user } from '../storageHelper'
import api from '@/api/'
import jwtDecode from 'jwt-decode'

const state = {
  profile: user.profile || {},
  token: user.token || null,
  tokenDecoded: user.tokenDecoded || null,
  lastUpdate: user.lastUpdate,
  isLoginRequest: false,
  isLoggedIn: user.isLoggedIn || false,
  error: null
}

const getters = {
  isLoggedIn: state => state.isLoggedIn,
  isLoginRequest: state => state.isLoginRequest,
  canManage: state => {
    if (!state.isLoggedIn) {
      return false
    }
    return state.profile.role === 'admin'
  },
  getToken: state => state.token
}

const actions = {
  async loginRequest ({ commit, state }, credentials) {
    commit(types.LOGIN_REQUEST)
    try {
      const res_ = await api.auth.authenticate(credentials)
      const body = res_.body
      if (body.error) {
        commit(types.LOGIN_FAILED, body.error)
      } else {
        const token = body.accessToken
        // const profile = jwtDecode(token)
        const profile = body.user
        commit(types.LOGIN_USER, {token, profile})
      }
    } catch (e) {
      // console.log(e)
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
    const decoded = jwtDecode(token)
    state.profile = profile
    state.token = token
    state.tokenDecoded = decoded
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
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
