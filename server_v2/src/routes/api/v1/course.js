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

  let select = 'name subject level institute promotionPrice price studyHour totalDay'

  const courses = await CourseService.search({page, limit, sort, filters, select})
  ctx.body = courses
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
  const id = helpers.filterInt(ctx.params.id)
  ctx.body = `${id} Review`
})

/**
 * Get a course information by course ID
 */
course.get('/:id', async (ctx, next) => {
  const id = ctx.params.id
  const course = await CourseService.findOne(id)
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

module.exports = course
