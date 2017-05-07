import Vue from 'vue'
import { API_ROOT } from '@/config'

const getList = () => {
  return Vue.http.get(API_ROOT + 'institute/list')
}

export default {
  getList
}
