const models = require('../models')
const Course = models.Course
const Institute = models.Institute

// .with('username', 'birthyear').without('password', 'access_token');

const getAll = () => {
  return Course.find().exec()
}

const findOne = (id) => {
  return Course.findOne({ '_id': id }).populate('institute').populate({
    path: 'reviews',
    populate: {
      path: 'userId'
    }
  }).exec()
}

const search = async ({ page = 0, limit = 10, sort = { 'createdAt': -1 }, filters = {}, select = '' }) => {
  page = parseInt(page) || 0
  limit = parseInt(limit) || 10
  console.log(filters)
  try {
    if (filters.institute) {
      const institute_ = await Institute.find({ name: { $in: filters.institute } }).select('_id')
      const insList = institute_.map((ins) => {
        return ins._id
      })

      filters.$and.push({ institute: { $in: insList } })
      delete filters.institute
    }
    const courses = await Course.find(filters)
      .populate('institute')
      .populate('level')
      .skip(page * limit)
      .limit(limit)
      .sort(sort)
      .select(select)
      .exec()

    const count = await Course.count(filters).exec()
    courses.count = count

    return { courses, count }
  } catch (e) {
    console.log(e)
    return { courses: [], count: 0 }
  }
}

const searchHelp = async () => {
  try {
    const levels = await Course.distinct('level').exec()

    const institute = await Institute.find({}, '-_id').select('name')
    const institutes = institute.map((ins) => {
      return ins.name
    })

    return {
      levels,
      institutes
    }
  } catch (e) {
    return null
  }
}

const save = (data) => {
  // Todo.
  let course = new Course(data)
  course.version = 1
  // {
    // name: data.name,
    // subject: data.subject,
    // description: data.description
  // }
  return course.save()
}

module.exports = {
  getAll,
  findOne,
  search,
  searchHelp,
  save
}
