const Router = require('koa-router')
const upload = new Router()

upload.post('/', async(ctx) => {
  // console.log(ctx.request.body)
  ctx.body = ctx.request.body
})
module.exports = upload
