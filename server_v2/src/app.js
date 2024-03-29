'use strict'

const Koa = require('koa')
const app = new Koa()
const koaBody = require('koa-body')
// const adapt = require('koa-adapter')
const json = require('koa-json')
const jwt = require('koa-jwt')
const fs = require('fs-extra')
// const router = require('koa-router')()
const cors = require('kcors')
// const os = require('os')
const path = require('path')
const pathUtils = require('./utils/pathUtils')

app.use(require('koa-etag')())
app.use(json())
// console.log(path.join(pathUtils.getRoot(), '../', 'storage', 'temp'))
app.use(require('koa-static')(path.join(__dirname, 'public')))

// Use Cors
app.use(cors())

// Use compress
app.use(require('koa-compress')({
  flush: require('zlib').Z_SYNC_FLUSH
}))

// Use BodyParser
app.use(koaBody({
  formLimit: '100mb',
  multipart: true,
  formidable: {
    maxFieldsSize: 10 * 1024 * 1024,
    uploadDir: path.join(pathUtils.getRoot(), '../', 'storage', 'temp')
  }
}))

/**
 * Remove files in temp folder before next
 */
app.use(async (ctx, next) => {
  await next()
  if (ctx.request.body.files) {
    const files = ctx.request.body.files
    if (files) {
      Object.keys(files).map(async (key, index) => {
        if (files[key] != null) {
          // If multiple files
          if (Array.isArray(files[key])) {
            files[key].forEach(async file => {
              const exists = await fs.pathExists(file.path)
              if (exists) {
                try {
                  await fs.remove(file.path)
                } catch (e) {
                  console.log(e)
                }
              }
            })
          } else {
            const exists = await fs.pathExists(files[key].path)
            if (exists) {
              try {
                await fs.remove(files[key].path)
              } catch (e) {
                console.log(e)
              }
            }
          }
        }
      })
    }
  }
})

// Error handlers
app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    console.log(err)
    // will only respond with JSON
    const errCode = err.statusCode || err.status || 500
    ctx.status = errCode
    if (err.status === 401) {
      ctx.body = {
        message: 'Protected resource, use Authorization header to get access\n'
      }
    } else {
      ctx.body = {
        message: err.message
      }
    }
  }
})

// Add jwt middleware
app.use(jwt({
  secret: process.env.JWT_SECRET || 'USE .env AND CHANGE JWT_SECRET',
  passthrough: true
}).unless({ path: [/^\/public/] }))

// import routes
const index = require('./routes/index')
// App use router
app.use(index.routes())

module.exports = app
