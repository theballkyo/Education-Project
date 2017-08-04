const Router = require('koa-router')
const fs = require('fs-extra')
const path = require('path')
const pathUtils = require('../../../utils/pathUtils')
const CourseService = require('../../../services/CourseService')
const LevelService = require('../../../services/LevelService')
const ReportService = require('../../../services/ReportService')
const hashids = require('../../../utils/hashIds')
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
    filterAndGroup.push({ institute: { $in: req.institute.split(',') } })
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

  const courses = await CourseService.search({ page, limit, sort, filters, select })
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

  const courses = await CourseService.search({ page, limit, sort, filters, select })
  ctx.body = courses
})

/**
 * Get a course information by course ID
 */
course.get('/:id/edit', async (ctx, next) => {
  if (!ctx.state.user) {
    ctx.throw('Access Denied', 401)
  }
  const id = ctx.params.id
  const select = 'name institute subject level description teacher price promotionPrice email phone website address startDate endDate hourPerDay totalDay coverImage images tags dayOfWeek'
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
    ip: ctx.request.ip,
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
 * Add report review
 */
course.post('/review/report', async (ctx) => {
  const id = ctx.request.body.reviewId
  let course = await CourseService.findOne(id)
  if (course == null) {
    ctx.body = { error: true, message: 'course not found' }
    return
  }
  const data = {
    name: ctx.request.body.name,
    email: ctx.request.body.email,
    message: ctx.request.body.message,
    ip: ctx.request.ip,
    reason: ctx.request.body.reason,
    reviewId: id
  }
  ReportService.reviewReport(data)
  ctx.body = { message: 'report send'}
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
  const files = ctx.request.body.files
  let course = JSON.parse(fields.course)
  course.createBy = ctx.state.user.id

  // Dummy institute
  // course.institute = '590cafb108873a5004dd9576'

  // Save a course
  course = await CourseService.save(course)

  let slideImage = []
  console.log(files)
  if (files.cover) {
    const filename = course._id + 'cover.' + files.cover.name.split('.').pop()
    fs.renameSync(files.cover.path, path.join(pathUtils.getRoot(), 'public', 'images', filename))
    course.coverImage = filename
  }

  if (files.imageSlide && files.imageSlide.length > 0) {
    for (const image of files.imageSlide) {
      const date = new Date()
      const hash = await hashids.encode(date.getTime())
      const filename = course._id + `.slide.${hash}.` + image.name.split('.').pop()
      const newPath = path.join(pathUtils.getRoot(), 'public', 'images', filename)
      try {
        await fs.move(image.path, newPath)
        slideImage.push(filename)
        console.log(slideImage)
      } catch (e) {
        console.log(e)
      }
    }
  }
  // console.log(slideImage)
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

  if (course.createBy !== ctx.state.user.id) {
    ctx.throw('Access Denied', 401)
  }

  course.name = newCourse.name
  course.institute = newCourse.institute
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

  const files = ctx.request.body.files
  let slideImage = []

  if (files.cover) {
    console.log('cover')
    console.log(files.cover)
    const filename = course._id + '.cover.' + files.cover.name.split('.').pop()
    fs.renameSync(files.cover.path, path.join(pathUtils.getRoot(), 'public', 'images', filename))
    course.coverImage = filename
  }

  if (newCourse.imageSlide && newCourse.imageSlide.length > 0) {
    let num = 0
    for (let image of newCourse.imageSlide) {
      if (image.isNew) {
        let file = null
        if (!Array.isArray(files.imageSlide)) {
          file = files.imageSlide
        } else {
          file = files.imageSlide[num]
        }

        const date = new Date()
        const hash = await hashids.encode(date.getTime())
        const filename = course._id + `.slide.${hash}.` + file.name.split('.').pop()
        const newPath = path.join(pathUtils.getRoot(), 'public', 'images', filename)
        try {
          await fs.move(file.path, newPath)
          slideImage.push(filename)
        } catch (e) {
          console.log(e)
        }
        num++
      } else {
        slideImage.push(image.name)
      }
    }
  }

  if (slideImage.length >= 1) {
    for (const image of course.images) {
      // Remove image is not use
      if (slideImage.indexOf(image) < 0) {
        const path_ = path.join(pathUtils.getRoot(), 'public', 'images', image)
        try {
          await fs.remove(path_)
        } catch (e) {
          console.log(e)
        }
      }
    }
    course.images = slideImage
  }

  // Update course
  await CourseService.save(course)
  ctx.body = { message: 'Edit a course' }
})

module.exports = course
