const mongoose = require('../datasource').getMongoose()
const timestamps = require('mongoose-timestamp')

const getSchema = (autoIncrementPlugin) => {
  const UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    role: { type: String }
  })

  UserSchema.plugin(timestamps)

  UserSchema.plugin(autoIncrementPlugin.plugin, 'Users')

  return UserSchema
}

module.exports = {
  getSchema
}
