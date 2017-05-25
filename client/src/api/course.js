// import Vue from 'vue'
// import { API_URL } from './BaseAPI'
import { CourseResource } from './resource'

// import http from '@/utils/http-helper'
// const AUTH_URL = 'https://mcapi.ca/query/play.minesuperior.com/info'

/**
 * Get all courses
 *
 * Options
 * Integer page => page number
 * Object  filter => filter course "key" => value
 * @param Object option
 */
const getCourses = ({page, filters = {}} = {}) => {
  return CourseResource.get({ page, ...filters })
}

/**
 * Get course by ID
 * @param Integer id
 */
const getCourseById = id => {
  return CourseResource.get({ id })
}

/**
 * Get all levels in course
 */
const getLevels = () => {
  return CourseResource.get({ id: 'level' })
}
export default {
  getCourses,
  getCourseById,
  getLevels
}
