const Router = require('koa-router')
const UserService = require('../../../services/UserService')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const user = new Router()

user.post('/login', async (ctx) => {
  const email = ctx.request.body.email
  const password = ctx.request.body.password
  const user = await UserService.findOne(email)
  if (user && bcrypt.compareSync(password, user.password)) {
    // Generate JWT access token
    const accessToken = jwt.sign({
      id: user._id
    }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })
    // Remove password before send a response
    delete user.password

    let res = {
      accessToken,
      user
    }

    ctx.body = res
  } else {
    ctx.body = { message: 'not found' }
  }
})

module.exports = user
