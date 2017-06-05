const mongoose = require('../datasource').getMongoose()
const timestamps = require('mongoose-timestamp')
const Joi = require('joi')

const JoiSchema = Joi.object().keys({
  line: Joi.string(),
  city: Joi.string(),
  country: Joi.string(),
  postalCode: Joi.number(),
  private: Joi.bool().required()
})

const AddressSchema = new mongoose.Schema({
  // [lat,lng]
  // coordinates: {type: [Number], required: true, index: '2dsphere'}
  line: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: false
  },
  country: {
    type: String,
    required: false
  },
  postalCode: {
    type: String,
    required: false
  },
  private: {
    type: Boolean,
    required: false,
    default: false
  }
})

AddressSchema.plugin(timestamps)

// if (!AddressSchema.options.toObject) {
//     AddressSchema.options.toObject = {};
// }

// AddressSchema.options.toObject.transform = function (doc, ret) {
//     const sanitized = _.omit(ret, '__v', '_id', 'createdAt', 'updatedAt');
//     return sanitized;
// };

module.exports = {
  AddressSchema,
  JoiSchema
}
