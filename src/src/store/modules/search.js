import * as types from '../mutation-types'

const state = {
  course: {
    subject: '',
    level: '',
    institution: '',
    price: 0
  }
}

const actions = {
  courseSettings ({commit}, settings) {
    commit(types.SEARCH_COURSE_SET, {settings})
  }
}

const mutations = {
  [types.SEARCH_COURSE_SET] (state, {settings}) {
    state.course = settings
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
