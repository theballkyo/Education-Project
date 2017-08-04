const mongoose = require('../datasource').getMongoose()
const timestamps = require('mongoose-timestamp')

const getSchema = (autoIncrementPlugin) => {
  const ReportSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true
    },
    reason: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    message: {
      type: String
    },
    ip: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    reviewId: {
      type: Number,
      required: true
    },
    /**
     * 0 is close
     * 1 is active
     */
    status: {
      type: Number,
      required: true,
      default: 1
    }
  })

  ReportSchema.plugin(timestamps)

  ReportSchema.plugin(autoIncrementPlugin.plugin, 'Reports')

  return ReportSchema
}

module.exports = {
  getSchema
}
