/**
 * Created by Jiravat on 3/2/2560.
 */
'use strict';

const CourseService = require('../services/CourseService');
const models = require('../models');

const Course = models.Course;
const Institute = models.Institute;

module.exports = {
  create,
  updateSingle,
  getSingle,
  deleteSingle,
  searchCourse,
  getCourses,
  getAllLevel
};

function* create(req, res) {
  req.body.createBy = req.auth.sub;
  res.json(yield CourseService.create(req.body));
}

function* updateSingle(req, res) {
  const course = yield CourseService.update(req.params.id, req.body);
  if (course.error) res.status(404).json({ "msg": "not found" });
  else res.json({ msg: "update success" });
}

function* getSingle(req, res) {
  const course = yield CourseService.getSingle(req.params.id);
  if (course.error) res.status(404).json({ "msg": "Course not found" });
  else res.json(course);
}

function* deleteSingle(req, res) {
  const course = yield CourseService.deleteSingle(req.params.id);
  if (course.error) res.status(404).json({ "msg": "not found" });
  else res.json({ "msg": "delete success" });
}

function* searchCourse(req, res) {
  var text = req.query.text;
  try {
    var courses = Course.find({ $text: { $search: text } })
      .limit(10);
    courses.exec(function (err, courses) {
      if (err)
        return res.json({ "msg": "Search not found" }, 404);
      res.json(courses);
    });

  }
  catch (e) {
    return res.json({ "msg": "error" }, 404);
  }
}

function* getAllLevel(req, res) {
  try {
    const levels = Course.distinct('level')

    levels.exec(function (err, levels) {
      if (err) {
        return res.json({ "msg": "Search not found" }, 404);
      }
        return res.json(levels);
    });
  }
  catch (e) {
    return res.status(404).json({ "msg": "error" });
  }
}

async function getCourses(req, res) {
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) - 1 || 0;

  let filters = {

  }

  let filterAndGroup = []

  if (req.query.subject) {
    filters.$text = { $search: req.query.subject }
  }
  if (req.query.level) {
    filterAndGroup.push({ level: { $in: req.query.level.split(',') }})
  }
  if (req.query.institute) {
    const institute_ = await Institute.find({ name: { $in: req.query.institute.split(',') }}).select('_id')
    const ins_list = institute_.map((ins) => {
      return ins._id
    })
    console.log(ins_list)
    filterAndGroup.push({ institute: { $in: ins_list }})
  }
  if (req.query.priceMin && req.query.priceMax) {
    const priceMin = parseInt(req.query.priceMin)
    const priceMax = parseInt(req.query.priceMax)
    filterAndGroup.push({ price: { $gte: priceMin, $lte: priceMax } })
  }

  if (filterAndGroup.length > 0) {
    filters.$and = filterAndGroup
  }
  let sort = {
    // 'createdAt': -1
  }

  if (req.query.sortBy) {
    let sort_ = req.query.sortBy.split('.')
    sort[sort_[0]] = parseInt(sort_[1])
  }
  console.log(filters)
  try {
    const courses = Course.find(filters)
      .populate('institute')
      .skip(page * limit)
      .limit(limit)
      .sort(sort);

    courses.exec(function (err, courses) {
      if (err) {
        return res.json({courses: [], count: 0});
      }
      Course.count(filters).exec(function (err, count) {
        if (err) {
          return res.json({courses: [], count: 0});
        }
        courses.count = count
        return res.json({ courses, count });
      });
    });
  }
  catch (e) {
    console.log(e)
    return res.status(404).json({ "msg": "error" });
  }
}
