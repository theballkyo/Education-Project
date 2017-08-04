const Router = require('koa-router')
const course = require('./course')
const review = require('./review')
const level = require('./level')
const upload = require('./upload')
const user = require('./user')
// const tests = require('./tests')
const report = require('./report')

const r = new Router({ prefix: '/api/v1' })

r.use('/course', course.routes(), course.allowedMethods())
r.use('/review', review.routes(), review.allowedMethods())
r.use('/level', level.routes(), level.allowedMethods())
r.use('/upload', upload.routes(), upload.allowedMethods())
r.use('/user', user.routes(), user.allowedMethods())
// r.use('/tests', tests.routes(), tests.allowedMethods())
r.use('/report', report.routes(), report.allowedMethods())

module.exports = r
