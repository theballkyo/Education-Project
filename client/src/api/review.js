import { ReviewResource } from './resource'

const getById = id => {
  return ReviewResource.get({ id })
}

export default {
  getById
}
