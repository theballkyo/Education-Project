const mongoose = require('../datasource').getMongoose()
const timestamps = require('mongoose-timestamp')
const Address = require('./Address').AddressSchema

const UserSchema = new mongoose.Schema({
  username: { type: String, require: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  socialNetworkId: { type: String },
  socialNetworkAccessToken: { type: String },
  resetPasswordCode: { type: String },
  resetPasswordExpiration: Date,
  avatarUrl: { type: String },
  phone: { type: String },
  role: { type: String },
  address: { type: Address },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
})

UserSchema.plugin(timestamps)

// if (!UserSchema.options.toObject) {
//     UserSchema.options.toObject = {};
// }

// UserSchema.options.toObject.transform = function (doc, ret) { // eslint-disable-line no-unused-vars
//     const sanitized = _.omit(ret, '__v', '_id', 'password', 'createdAt', 'updatedAt');
//     sanitized.id = doc._id;
//     return sanitized;
// };

module.exports = {
  UserSchema
}
