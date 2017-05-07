import * as types from '../mutation-types'

// export const CONNECTION_TYPE = {
//   // Connection ok.
//   OK: 0,
//   // Connection fail eg. lost the internet.
//   FAIL: 1,
//   // Retry to connect a server.
//   RETRY: 2,
//   // Wait for connection
//   WAIT: 3
// }

const state = {
  status: types.CONNECTION_WAIT,
  msg: ''
}

const actions = {
  fail ({commit}, msg) {
    commit(types.CONNECTION_FAIL, msg)
  },
  ok ({commit}) {
    commit(types.CONNECTION_OK)
  },
  retry ({commit}) {
    commit(types.CONNECTION_RETRY)
  },
  wait ({commit}) {
    commit(types.CONNECTION_WAIT)
  },
  connecting ({commit}) {
    commit(types.CONNECTION_CONNECTING)
  }
}

const mutations = {
  [types.CONNECTION_OK] (state) {
    state.status = types.CONNECTION_OK
    state.msg = ''
  },
  [types.CONNECTION_FAIL] (state, msg = '') {
    state.status = types.CONNECTION_FAIL
    state.msg = msg
  },
  [types.CONNECTION_RETRY] (state) {
    state.status = types.CONNECTION_RETRY
  },
  [types.CONNECTION_WAIT] (state) {
    state.status = types.CONNECTION_WAIT
  },
  [types.CONNECTION_CONNECTING] (state) {
    state.status = types.CONNECTION_CONNECTING
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
