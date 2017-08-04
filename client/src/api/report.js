import { http } from './resource'
import { API_ROOT } from '@/config'

const getReport = () => {
  return http.get(API_ROOT + 'report')
}

export default {
  getReport
}
