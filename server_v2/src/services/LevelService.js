const models = require('../models')
const Levels = models.Levels

const getTree = async () => {
  const levels_ = await new Promise((resolve, reject) => {
    Levels.getChildrenTree({
      fields: {'_id': 1, name: 1, code: 1, disabled: 1}
    }, (error, level) => {
      if (error) {
        reject(error)
      }
      resolve(level)
    }).exec()
  })

  return levels_
}

const add = async (data, parent = null) => {
  let level = new Levels(data)
  if (parent != null) {
    level.parent = parent
  }
  level = await level.save()
  return level
}

const findOne = async id => {
  const level = await Levels.findOne({_id: id}).exec()
  return level
}

module.exports = {
  getTree,
  add,
  findOne
}
