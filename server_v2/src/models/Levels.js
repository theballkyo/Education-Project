const datasource = require('../datasource')
const mongoose = datasource.getMongoose()
const Joi = require('joi')

const JoiSchema = Joi.object().keys({
  code: Joi.string().min(1).max(3).required(),
  name: Joi.string().min(1).max(32).required(),
  path: Joi.string(),
  detail: Joi.string()
})

const getSchema = (autoIncrement, tree) => {
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

  LevelSchema.plugin(autoIncrement.plugin, 'Levels')
  LevelSchema.plugin(tree, {
    idType: mongoose.Schema.Types.Number
  })

  return LevelSchema
}

module.exports = {
  JoiSchema,
  getSchema
}
