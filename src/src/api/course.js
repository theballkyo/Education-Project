// import Vue from 'vue'
// import { API_URL } from './BaseAPI'
import { CourseResrouce } from './resource'

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
  // Todo.
  return CourseResrouce.get({ page, ...filters })
}

/**
 * Get course by ID
 * @param Integer id
 */
const getCourseById = id => {
  return CourseResrouce.get({ id })
}

export default {
  getCourses,
  getCourseById
}
