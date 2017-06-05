const mongoose = require('../datasource').getMongoose()

const CountersSchema = new mongoose.Schema({
  _id: {
    type: String
  },
  seq: {
    type: Number,
    required: true
  }
})

module.exports = {
  CountersSchema
}
