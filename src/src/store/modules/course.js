import { course } from '../storageHelper'
import * as types from '../mutation-types'
import * as courseAPI from '@/api/course'

const state = {
  all: course.all || [],
  isLoading: false,
  error: null
}

const getters = {
  allCourses: state => state.all,
  getCourseById: (state, getters) => (id) => {
    return state.all.find(course => course.id === id)
  }
}

const actions = {
  async requestAllCourses ({ commit }, options) {
    // if (state.isLoading) {
    //   return
    // }
    commit(types.LOADING_COURSE)
    commit(types.CLEAR_COURSE)
    try {
      const course = await courseAPI.getCourses(options)
      // console.log(course)
      commit(types.RECEIVE_COURSE, course.body)
    } catch (e) {
      commit(types.COURSE_LOAD_ERROR)
    }
    commit(types.END_LOADING_COURSE)
  },
  async requestCourseById ({ commit, state }, id) {
    if (state.isLoading) {
      return
    }
    commit(types.LOADING_COURSE)
    commit(types.REMOVE_COURSE, id)
    try {
      const course = await courseAPI.getCourseById(id)
      commit(types.ADD_COURSE, course.body)
    } catch (e) {
      commit(types.COURSE_LOAD_ERROR)
    }
  },
  addCourse ({ commit }, course) {
    commit(types.ADD_COURSE, course)
  }
}

const mutations = {
  [types.ADD_COURSE] (state, course) {
    state.all.push(course)
  },
  [types.REMOVE_COURSE] (state, id) {
    state.all.filter((course) => {
      course.id !== id
    })
  },
  [types.RECEIVE_COURSE] (state, courses) {
    state.all = courses
  },
  [types.CLEAR_COURSE] (state, id = null) {
    state.all = []
  },
  [types.LOADING_COURSE] (state) {
    // Clear prevent error status.
    state.error = false
    state.isLoading = true
  },
  [types.END_LOADING_COURSE] (state) {
    state.isLoading = false
  },
  [types.COURSE_LOAD_ERROR] (state) {
    state.error = true
  },
  [types.COURSE_CLEAR_LOAD_ERROR] (state) {
    state.error = false
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
