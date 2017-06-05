const models = require('../models')
const User = models.User

const findOne = (email) => {
  try {
    return User.findOne({email}).select('username firstName lastName email phone role password').exec()
  } catch (e) {
    console.log(e)
    return null
  }
}

module.exports = {
  findOne
}
