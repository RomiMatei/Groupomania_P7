const { v4: uuidv4 } = require('uuid')
const multer = require('multer')

const MIME_TYPES = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${process.env.IMAGE_URL}`)
  },

  filename: (req, file, cb) => {
    const extension = MIME_TYPES[file.mimetype]
    const name = file.originalname.toLowerCase().split(' ').join('_')

    cb(null, uuidv4() + name + '.' + extension)
  },
})

module.exports = multer({ storage }).single('image')
