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

export default {
  getCourses,
  getCourseById,
  searchHelper,
  save,
  getLevel
}
