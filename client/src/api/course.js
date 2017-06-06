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
 * Get course by ID for edit page
 */
const getCourseByIdForEdit = id => {
  return http.get(API_ROOT + `course/${id}/edit`)
}
/**
 * Save a course
 * @param FormData formData
 */
const save = formData => {
  return CourseResource.save(formData)
}

/**
 * Update a course
 */
const update = (id, formData) => {
  // console.log(formData)
  return CourseResource.update({id}, formData)
}

/**
 * Add review
 */
const addReview = (id, review) => {
  return http.post(API_ROOT + `course/${id}/review`, review)
}

/**
 * Get review
 */
const getReview = id => {
  return http.get(API_ROOT + `course/${id}/review`)
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
  getCourseByIdForEdit,
  searchHelper,
  save,
  update,
  addReview,
  getReview,
  getLevel,
  getUserCourse
}
