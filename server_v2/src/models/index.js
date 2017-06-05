const datasource = require('../datasource')
const db = datasource.getDb('mongodb://localhost:27017/eduo', {
  poolSize: 4
})
const mongoose = datasource.getMongoose()
const tree = require('mongoose-data-tree')
const autoIncrement = require('mongoose-auto-increment')
autoIncrement.initialize(db)

// Counters Model
const CountersSchema = require('./Counters').CountersSchema
const Counters = db.model('Counters', CountersSchema)

// Course model
const CourseSchema = require('./Course').CourseSchema
const Course = db.model('Course', CourseSchema)

// Levels model
const LevelSchema = require('./Levels').LevelSchema
LevelSchema.plugin(autoIncrement.plugin, 'Levels')
LevelSchema.plugin(tree, {
  idType: mongoose.Schema.Types.Number
})

const Levels = db.model('Levels', LevelSchema)

// Institute model
const InstituteSchema = require('./Institute').InstituteSchema
const Institute = db.model('Institute', InstituteSchema)

// User model
const UserSchema = require('./User').UserSchema
const User = db.model('User', UserSchema)

// Address
const AddressSchema = require('./Address').AddressSchema
const Address = db.model('Address', AddressSchema)

// Review model
const ReviewSchema = require('./Review').ReviewSchema
const Review = db.model('Review', ReviewSchema)

// Set Auto increment ID for course
CourseSchema.pre('save', next => {
  const doc = this
  Counters.findByIdAndUpdate({
    _id: 'courseId'
  }, {
    $inc: { seq: 1 }
  }, (error, counter) => {
    if (error) {
      return next(error)
    }
    doc.seq = counter.seq
    next()
  })
})

module.exports = {
  Course,
  Levels,
  Institute,
  User,
  Address,
  Review
}
