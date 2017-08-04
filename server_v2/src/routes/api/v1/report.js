const Router = require('koa-router')
const report = new Router()
const ReportService = require('../../../services/ReportService')

report.get('/', async ctx => {
  if (!ctx.state.user) {
    ctx.throw('Access Denied', 401)
  }
  const reports = await ReportService.getActive()
  ctx.body = reports
})

module.exports = report
