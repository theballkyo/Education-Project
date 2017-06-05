const Router = require('koa-router')
const LevelService = require('../../../services/LevelService')
const level = new Router()

level.get('/all', async ctx => {
  const level = await LevelService.getTree()
  ctx.body = level
})

module.exports = level
