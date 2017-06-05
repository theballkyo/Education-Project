const datasource = require('../datasource')
const mongoose = datasource.getMongoose()
const Joi = require('joi')

const JoiSchema = Joi.object().keys({
  code: Joi.string().min(1).max(3).required(),
  name: Joi.string().min(1).max(32).required(),
  path: Joi.string(),
  detail: Joi.string()
})

const LevelSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  disabled: {
    type: Boolean,
    required: true,
    default: false
  },
  detail: {
    type: String
  }
})

// Set Auto increment ID for levels
// LevelSchema.pre('save', async function (next) {
//   const doc = this
//   await Counters.findByIdAndUpdate({
//     _id: 'levelsId'
//   }, {
//     $inc: { seq: 1 }
//   }, (error, counter) => {
//     if (error) {
//       return next(error)
//     }
//     doc._id = counter.seq
//     next()
//   })
// })

// LevelSchema.plugin(AutoIncrement, {inc_field: 'id'})
// LevelSchema.plugin(AutoIncrement.get().plugin, 'Levels')

module.exports = {
  JoiSchema,
  LevelSchema
}
