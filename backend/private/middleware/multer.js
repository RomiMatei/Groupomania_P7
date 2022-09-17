const { v4: uuidv4 } = require('uuid');
const multer = require('multer');

const MIME_TYPES = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'public/images');
  },

  filename: (req, file, callback) => {
    const extension = MIME_TYPES[file.mimetype];
    const name = file.originalname.toLowerCase().split(' ').join('_');

    callback(null, uuidv4() + name + '.' + extension);
  }
});

module.exports = multer({ storage }).single('image');
