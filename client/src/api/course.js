import { CourseResource, http } from './resource'
import { API_ROOT } from '@/config'

/**
 * Get all courses
 *
 * Options
 * Integer page => page number
 * Object  filter => filter course "key" => value
 * @param Object option
 */
const getCourses = ({filters = {}} = {}) => {
  // const filtersEncode = JSON.stringify(filters)
  return CourseResource.get({ ...filters })
}

/**
 * Get course by ID
 * @param Integer id
 */
const getCourseById = id => {
  return CourseResource.get({ id })
}

/**
 * Save a course
 * @param FormData formData
 */
const save = formData => {
  return CourseResource.save(formData)
}

/**
 * Get all levels in course
 */
const searchHelper = () => {
  return CourseResource.get({ id: 'searchhelper' })
}

/**
 * Get a levels
 */
const getLevel = () => {
  return CourseResource.get({ id: 'levels' })
}

/**
 * Get a course is create by user
 */
const getUserCourse = () => {
  return http.get(API_ROOT + 'course/user/list')
}

export default {
  getCourses,
  getCourseById,
  searchHelper,
  save,
  getLevel,
  getUserCourse
}
