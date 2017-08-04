const datasource = require('../datasource')
const db = datasource.getDb(process.env.DB_URL, {
  poolSize: 4
})
// const mongoose = datasource.getMongoose()
const tree = require('mongoose-data-tree')
const autoIncrement = require('mongoose-auto-increment')
autoIncrement.initialize(db)

// Review Schema
const ReviewSchema = require('./Review').ReviewSchema
ReviewSchema.plugin(autoIncrement.plugin, 'Reviews')

// Course model
const CourseSchema = require('./Course').getSchema(autoIncrement, ReviewSchema)
const Course = db.model('Course', CourseSchema)

// Levels model
const LevelSchema = require('./Levels').getSchema(autoIncrement, tree)
const Levels = db.model('Levels', LevelSchema)

// Report model
const ReportSchema = require('./Report').getSchema(autoIncrement)
const Report = db.model('Report', ReportSchema)

// User model
const UserSchema = require('./User').getSchema(autoIncrement)
const User = db.model('User', UserSchema)

// Set Auto increment ID for course
// CourseSchema.pre('save', next => {
//   const doc = this
//   Counters.findByIdAndUpdate({
//     _id: 'courseId'
//   }, {
//     $inc: { seq: 1 }
//   }, (error, counter) => {
//     if (error) {
//       return next(error)
//     }
//     doc.seq = counter.seq
//     next()
//   })
// })

module.exports = {
  Course,
  Levels,
  Report,
  User
}
