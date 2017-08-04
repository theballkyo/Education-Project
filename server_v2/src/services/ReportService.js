const models = require('../models')
const Report = models.Report

const reviewReport = (data) => {
  data.type = 'review'
  const report = new Report(data)
  return report.save()
}

const getActive = () => {
  return Report.find({status: 1}).exec()
}

module.exports = {
  reviewReport,
  getActive
}
