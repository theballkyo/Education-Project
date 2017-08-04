const Router = require('koa-router')

const review = new Router()

review.get('/report', async (ctx) => {
  const data = {
    name: ctx.request.body.name,
    email: ctx.request.body.email,
    reason: ctx.request.body.reason,
    message: ctx.request.body.message,
    ip: ctx.request.ip
  }
  // Todo
})

module.exports = review
