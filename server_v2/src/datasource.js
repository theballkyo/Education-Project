const mongoose = require('mongoose')
let _dbs = {}

// Set Promise
mongoose.Promise = global.Promise

const getDb = (url, options) => {
  if (!_dbs[url]) {
    const conn = mongoose.createConnection(url, options)
    _dbs[url] = conn
  }
  return _dbs[url]
}

const getMongoose = () => {
  return mongoose
}

module.exports = {
  getDb,
  getMongoose
}
