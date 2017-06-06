const Router = require('koa-router')
const fs = require('fs')
const path = require('path')
const pathUtils = require('../../../utils/pathUtils')
const helpers = require('../../../common/helpers')
const CourseService = require('../../../services/CourseService')
const LevelService = require('../../../services/LevelService')
const Hashids = require('hashids')
const hashids = new Hashids()
const course = new Router()

/**
 * Get all courses with filter options
 */
course.get('/', async (ctx, next) => {
  const req = ctx.request.query
  // return ctx.body = req
  const page = req.page - 1 || 0
  const limit = req.limit || 10
  let filters = {}
  let filterAndGroup = []

  if (req.subject) {
    filters.$text = { $search: req.subject }
  }

  // Set level filter
  if (req.level) {
    filterAndGroup.push({ level: { $in: req.level.split(',') } })
  }

  // Set institute
  if (req.institute) {
    filters['institute'] = req.institute.split(',')
  }

  // Set price
  if (req.priceMin && req.priceMax) {
    const priceMin = parseInt(req.priceMin)
    const priceMax = parseInt(req.priceMax)
    filterAndGroup.push({ price: { $gte: priceMin, $lte: priceMax } })
  }

  if (filterAndGroup.length > 0) {
    filters.$and = filterAndGroup
  }

  let sort = {
    // 'createdAt': -1
  }

  if (req.sortBy) {
    let sort_ = req.sortBy.split('.')
    sort[sort_[0]] = parseInt(sort_[1])
  }

  let select = 'name subject level institute promotionPrice price studyHour totalDay hourPerDay coverImage'

  const courses = await CourseService.search({page, limit, sort, filters, select})
  ctx.body = courses
})

/**
 * Get a courses is created by user
 */
course.get('/user/list', async ctx => {
  // Check authentication
  if (!ctx.state.user) {
    ctx.throw('Access Denied', 401)
  }
  let page = 0
  let limit = 1000
  let sort = {
    createdAt: 1
  }
  let filters = {
    createBy: ctx.state.user.id
  }
  let select = 'name subject level createdAt updatedAt'

  const courses = await CourseService.search({page, limit, sort, filters, select})
  ctx.body = courses
})

/**
 * Get a course information by course ID
 */
course.get('/:id/edit', async (ctx, next) => {
  const id = ctx.params.id
  const select = 'name subject level description teacher price promotionPrice email phone website address startDate endDate hourPerDay totalDay coverImage images tags dayOfWeek'
  const course = await CourseService.findOne(id, select)
  ctx.body = course
})

/**
 * Search Helper
 */
course.get('/searchhelper', async (ctx) => {
  const datas = await CourseService.searchHelp()
  ctx.body = datas
})

/**
 * Get levels
 */
course.get('/levels', async ctx => {
  const levels = await LevelService.getTree()
  ctx.body = levels
})

/**
 * Get a reviews by course ID
 */
course.get('/:id/review', async (ctx) => {
  const id = ctx.params.id

  let course = await CourseService.getReview(id)
  ctx.body = course.reviews[0]
})

/**
 * Add new review into a course
 */
course.post('/:id/review', async (ctx) => {
  const id = ctx.params.id
  let course = await CourseService.findOne(id)

  const review = {
    name: ctx.request.body.name,
    email: ctx.request.body.email,
    message: ctx.request.body.message,
    rating: parseInt(ctx.request.body.rating)
  }

  if (!course.reviews) {
    course.reviews = []
  }
  course.reviews.push(review)
  // console.log(course.reviews)
  await course.save()

  ctx.body = {
    message: 'Added review'
  }
})

/**
 * Get a course information by course ID
 */
course.get('/:id', async (ctx, next) => {
  const id = ctx.params.id
  const course = await CourseService.findOne(id)
  course.view += 1
  course.save()
  ctx.body = course
})

/**
 * Save a new course
 */
course.post('/', async (ctx) => {
  if (!ctx.state.user) {
    ctx.throw('Access Denied', 401)
  }
  const fields = ctx.request.body.fields
  let course = JSON.parse(fields.course)
  course.createBy = ctx.state.user.id

  // Dummy institute
  course.institute = '590cafb108873a5004dd9576'

  // Save a course
  course = await CourseService.save(course)

  const files = ctx.request.body.files
  let slideImage = []

  if (files.cover) {
    const filename = hashids.encodeHex(course._id) + 'cover.' + files.cover.name.split('.').pop()
    fs.renameSync(files.cover.path, path.join(pathUtils.getRoot(), 'public', 'images', filename))
    course.coverImage = filename
  }
  if (files.slide1) {
    const filename = hashids.encodeHex(course._id) + '1.' + files.slide1.name.split('.').pop()
    fs.renameSync(files.slide1.path, path.join(pathUtils.getRoot(), 'public', 'images', filename))
    slideImage.push(filename)
  }
  if (files.slide2) {
    const filename = hashids.encodeHex(course._id) + '2.' + files.slide1.name.split('.').pop()
    fs.renameSync(files.slide2.path, path.join(pathUtils.getRoot(), 'public', 'images',filename))
    slideImage.push(filename)
  }
  if (files.slide3) {
    const filename = hashids.encodeHex(course._id) + '3.' + files.slide1.name.split('.').pop()
    fs.renameSync(files.slide3.path, path.join(pathUtils.getRoot(), 'public', 'images', filename))
    slideImage.push(filename)
  }
  if (files.slide4) {
    const filename = hashids.encodeHex(course._id) + '4.' + files.slide1.name.split('.').pop()
    fs.renameSync(files.slide4.path, path.join(pathUtils.getRoot(), 'public', 'images', filename))
    slideImage.push(filename)
  }

  course.images = slideImage
  // Update course
  await CourseService.save(course)
  ctx.body = { message: 'Added a course' }
})

/**
 * Update a course
 */
course.put('/:id', async (ctx) => {
  if (!ctx.state.user) {
    ctx.throw('Access Denied', 401)
  }
  const fields = ctx.request.body.fields
  const newCourse = JSON.parse(fields.course)

  let course = await CourseService.findOne(ctx.params.id)

  course.name = newCourse.name
  course.subject = newCourse.subject
  course.level = newCourse.level
  course.description = newCourse.description
  course.teacher = newCourse.teacher
  course.price = newCourse.price
  course.promotionPrice = newCourse.promotionPrice
  course.email = newCourse.email
  course.phone = newCourse.phone
  course.website = newCourse.website
  course.address = newCourse.address
  course.startDate = newCourse.startDate
  course.endDate = newCourse.endDate
  course.hourPerDay = newCourse.hourPerDay
  course.totalDay = newCourse.totalDay
  course.dayOfWeek = newCourse.dayOfWeek
  course.tags = newCourse.tags

  // Dummy institute
  // course.institute = '590cafb108873a5004dd9576'

  // Save a course
  // course = await CourseService.save(course)

  /**
   * Todo Images edit
   */
  const files = ctx.request.body.files
  let slideImage = []

  if (files.cover) {
    const filename = hashids.encodeHex(course._id) + 'cover.' + files.cover.name.split('.').pop()
    fs.renameSync(files.cover.path, path.join(pathUtils.getRoot(), 'public', 'images', filename))
    course.coverImage = filename
  }
  if (files.slide1) {
    const filename = hashids.encodeHex(course._id) + '1.' + files.slide1.name.split('.').pop()
    fs.renameSync(files.slide1.path, path.join(pathUtils.getRoot(), 'public', 'images', filename))
    slideImage.push(filename)
  }
  if (files.slide2) {
    const filename = hashids.encodeHex(course._id) + '2.' + files.slide1.name.split('.').pop()
    fs.renameSync(files.slide2.path, path.join(pathUtils.getRoot(), 'public', 'images',filename))
    slideImage.push(filename)
  }
  if (files.slide3) {
    const filename = hashids.encodeHex(course._id) + '3.' + files.slide1.name.split('.').pop()
    fs.renameSync(files.slide3.path, path.join(pathUtils.getRoot(), 'public', 'images', filename))
    slideImage.push(filename)
  }
  if (files.slide4) {
    const filename = hashids.encodeHex(course._id) + '4.' + files.slide1.name.split('.').pop()
    fs.renameSync(files.slide4.path, path.join(pathUtils.getRoot(), 'public', 'images', filename))
    slideImage.push(filename)
  }

  course.images = slideImage
  // Update course
  await CourseService.save(course)
  ctx.body = { message: 'Edit a course' }
})

module.exports = course
