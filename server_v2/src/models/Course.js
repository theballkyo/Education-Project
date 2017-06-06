const mongoose = require('../datasource').getMongoose()
const timestamps = require('mongoose-timestamp')
const ObjectId = mongoose.Schema.Types.ObjectId
const Address = require('./Address')
const Joi = require('joi')

const JoiSchema = Joi.object().keys({
  name: Joi.string().min(3).max(100).required(),
  subject: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().min(0).max(10000).required(),
  promotionPrice: Joi.number().min(0).max(10000),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
  dayOfWeek: Joi.array(),
  hourPerDay: Joi.number().max(24).required(),
  totalDay: Joi.number().required(),
  email: Joi.string().email(),
  phone: Joi.string().required(),
  website: Joi.string(),
  coverImage: Joi.string(),
  level: Joi.string(),
  institute: Joi.string().required(),
  createdBy: Joi.string().required(),
  teacher: Joi.string(),
  view: Joi.number().integer(),
  images: Joi.array(),
  tags: Joi.array(),
  reviews: Joi.array(),
  address: Address.JoiSchema
})

const CourseSchema = new mongoose.Schema({
  seq: {
    type: Number,
    get: v => Math.round(v),
    set: v => Math.round(v)
  },
  name: {
    type: String,
    required: true
  },
  level: {
    type: Number,
    ref: 'Levels'
  },
  subject: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  // teacher: [{
  //   type: String,
  //   required: false
  // }],
  teacher: {
    type: String
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  dayOfWeek: {
    type: Array,
    required: true,
    default: [1, 2, 3, 4, 5, 6, 7]
  },
  hourPerDay: {
    type: Number,
    get: v => Math.round(v),
    set: v => Math.round(v),
    required: true
  },
  totalDay: {
    type: Number,
    get: v => Math.round(v),
    set: v => Math.round(v),
    required: true
  },
  email: {
    type: String,
    required: true
  },
  promotionPrice: {
    type: Number,
    required: true
  },
  address: {
    type: Address.AddressSchema
  },
  website: {
    type: String
  },
  phone: {
    type: String
  },
  tags: {
    type: [String]
  },
  view: {
    type: Number,
    required: true,
    get: v => Math.round(v),
    set: v => Math.round(v),
    default: 0
  },
  images: {
    type: [String]
  },
  coverImage: {
    type: String
  },
  institute: {
    type: ObjectId,
    ref: 'Institute'
  },
  createBy: {
    type: ObjectId,
    required: true,
    ref: 'User'
  },
  reviews: [
    {
      name: String,
      email: String,
      message: String,
      rating: {
        type: Number,
        get: v => Math.round(v),
        set: v => Math.round(v)
      }
    }
  ]
})

CourseSchema.plugin(timestamps)

// if (!CourseSchema.options.toObject) {
//   CourseSchema.options.toObject = {};
// }

// CourseSchema.options.toObject.transform = function (doc, ret, options) {
//   const sanitized = _.omit(ret, '__v', '_id', 'createdAt', 'updatedAt');
//   sanitized.id = doc._id;
//   return sanitized;
// };

CourseSchema.index({
  subject: 'text',
  name: 'text',
  description: 'text',
  teacher: 'text'
})

module.exports = {
  CourseSchema,
  JoiSchema
}
