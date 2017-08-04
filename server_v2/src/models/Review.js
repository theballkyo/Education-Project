const mongoose = require('../datasource').getMongoose()
const timestamps = require('mongoose-timestamp')

const ReviewSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  ip: String,
  rating: {
    type: Number,
    get: v => Math.round(v),
    set: v => Math.round(v)
  }
})

ReviewSchema.plugin(timestamps)

module.exports = {
  ReviewSchema
}
