const express = require('express');
const router = express.Router();

const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
// package to allow <input type="file"> in forms
const multer = require('multer');

const Movie = require('../models/Movie')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

var storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'my-movies', // The name of the folder in cloudinary
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    cb(null, file.originalname); // The file on cloudinary would have the same name as the original file name
  }
});

const uploadCloud = multer({ storage: storage });

/* GET home page */
router.get('/', (req, res, next) => {

  Movie.find().then((movies) => {
    res.render('index', { movies: movies });
  })

});

// POST /upload-image
router.post('/upload-image', uploadCloud.single('my-photo'), (req, res) => {

  // this is what cloudinary sets on req.file ==> namely the file's public URL
  const imageURL = req.file.url;
  // const imgName = req.file.originalname;

  Movie.create({ title: 'Test', description: 'Test Desc', imgUrl: imageURL }).then(() => {
    res.redirect('/')
  })

  User.findById(req.user._id).then((user) => {

    user.profileUrl = imageURL
    user.save().then(() => {

    })

  })



  //res.send('image uploaded')
})

module.exports = router;
