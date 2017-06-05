const Router = require('koa-router')
const tests = new Router()
const LevelService = require('../../../services/LevelService')

tests.all('/jwt', (ctx) => {
  if (!ctx.state.user) {
    ctx.throw('Access Denied', 401)
  }
  ctx.body = ctx.state.user
})

tests.all('/levels', async (ctx) => {
  const level = await LevelService.getTree()
  ctx.body = level
})

tests.all('/addLevel', async ctx => {
  let level = ''
  let parent = await LevelService.add({
    name: 'มัธยม',
    code: 'M'
  })
  for (let i = 1; i <= 6; i++) {
    level = await LevelService.add({
      name: 'มัธยม ' + i,
      code: 'M' + i
    }, parent)
  }
  ctx.body = level
})

module.exports = tests
