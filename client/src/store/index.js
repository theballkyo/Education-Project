import Vue from 'vue'
import Vuex from 'vuex'
import { state, mutations } from './mutations'
import plugins from './plugins'
import user from './modules/user'
import course from './modules/course'
import message from './modules/message'
import connection from './modules/connection'
import search from './modules/search'

Vue.use(Vuex)

export default new Vuex.Store({
  namespaced: true,
  state,
  mutations,
  plugins,
  modules: {
    user,
    course,
    message,
    connection,
    search
  },
  strict: process.env.NODE_ENV !== 'production'
})
