import * as types from '../mutation-types'

const state = {
  course: {
    subject: '',
    level: [],
    institute: [],
    price: [
      0,
      10000
    ]
  }
}

const getters = {
  course: state => state.course
}

const actions = {
  searchCourseSettings ({commit}, settings) {
    commit(types.SEARCH_COURSE_SET, {settings})
  },
  priceSetting ({commit}, price) {
    commit(types.SEARCH_COURSE_SET, {...state.course, ...price})
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
  getters,
  actions,
  mutations
}
