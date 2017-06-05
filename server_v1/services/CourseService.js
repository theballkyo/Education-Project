const models = require('../models');
const Course = models.Course;

const getAll = () => {
  return models.Course.find().exec()
}

module.exports = {
  getAll
};
