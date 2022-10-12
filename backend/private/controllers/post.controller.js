const config = require('../config/authentification.conf')
var jwt = require('jsonwebtoken')
const fs = require('fs')
const db = require('../models/index')
const Post = db.posts
const User = db.users
const Like = db.likes

exports.createPost = async (req, res, next) => {
  let userId
  let image = null

  // Check if user authorized to create a post
  if (req) {
    const token = req.headers['x-access-token']
    const decoded = await jwt.verify(token, config.secret)

    userId = await User.findByPk(decoded.id)
  } else {
    userId = null
  }

  if (req.file) {
    if (req.file.fieldname === 'image') {
      image = req.file.filename
    }
  }
  try {
    // Try to create post
    const response = await Post.create({
      author: userId.get('id'),
      content: req.body.content,
      post_created: new Date().getTime(),
      image: image,
      isLiked: false,
      likes: []
    })
    res.status(200).json(response)
  } catch (err) {
    res.status(500).json({ message: err })
  }
}

exports.deletePost = async (req, res, next) => {
  try {
    // Find post_id in DB
    const post = await Post.findByPk(req.params.id)
    const image = post.image

    // Delete post in DB
    const result = await Post.destroy({
      where: { id: req.params.id },
    }).then((val) => {
      // If image in the post, delete file in folder
      if (image) {
        fs.unlink(`${process.env.IMAGE_URL}${image}`, (err) => {
          if (err) {
            res.status(500).json({ message: err })
          }
        })
      }
    })
    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ message: err })
  }
}

exports.allPosts = async (req, res, next) => {
  const userId = req.userId

  try {
    // Show all posts list
    const allPostsDb = await Post.findAll({
      order: [['post_created', 'DESC']],
      raw: false,
      include: 'likes',
    })
    Promise.all(allPostsDb).then((values) => {
      values.map((value) => {
        var isLiked = value.likes.find((item) => item.user_id === userId)
        value.dataValues['isLiked'] = false
        value.dataValues['countLikes'] = value.likes.length

        if (value.dataValues.image) {
          value.dataValues['image'] =
            process.env.BACKEND_URL + '/images/' + value.dataValues.image
        }

        if (isLiked) {
          value.dataValues['isLiked'] = true
        }
      })
      res.status(200).json(values)
    })
  } catch (err) {
    res.status(500).json({ message: err })
  }
}
