/**
 * Created by Jiravat on 3/23/2017.
 */
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

function test(req, upload.single('avatar'), res) {
  console.log(req.body)
  res.json(req.body)
}

module.exports = {
  test
};