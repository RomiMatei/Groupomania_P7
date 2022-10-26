const fs = require('fs')
const db = require('../models/index')
const Post = db.posts

exports.createPost = async (req, res, next) => {
  let userId = req.userId
  let image = null

  // Check if file in post
  if (req.file) {
    if (req.file.fieldname === 'image') {
      image = req.file.filename
    }
  }
  try {
    // Create a post and return with values. Image field is overwritten for Redux state
    await Post.create({
      author: userId,
      content: req.body.content,
      post_created: new Date().getTime(),
      image: image,
    }).then((createdPost) => {
      createdPost.dataValues['message'] = {
        message: 'Félicitation votre message est posté',
        severity: 'success',
      }
      if (createdPost.dataValues.image) {
        const imageName = createdPost.dataValues.image
        createdPost.dataValues.image = `${process.env.BACKEND_URL}/public/images/${imageName}`
      }
      res.status(200).json(createdPost)
    })
  } catch (err) {
    res.status(500).json({
      message: {
        message: err,
        severity: 'error',
      },
    })
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
    }).then(() => {
      // If image in the post, delete file in folder
      if (image) {
        try {
          fs.unlink(`public/images/${image}`, (err) => {
            if (err) {
              res.status(404).json({
                message: {
                  message: err,
                  severity: 'error',
                },
              })
            }
          }) // end unlink
        } catch (err) {
          res.status(404).json({
            message: {
              message: err,
              severity: 'error',
            },
          })
        }
      }
    })
    res.status(200).json({
      result,
      message: {
        message: 'Post supprimé avec succès',
        severity: 'success',
      },
    })
  } catch (err) {
    res.status(500).json({
      message: {
        message: err,
        severity: 'error',
      },
    })
  }
}

exports.allPosts = async (req, res, next) => {
  const userId = req.userId

  try {
    // Show all posts list and JOIN Likes DB
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

        // Add backend URL for image
        if (value.dataValues.image) {
          value.dataValues['image'] =
            process.env.BACKEND_URL + '/images/' + value.dataValues.image
        }

        // Check if is liked and write variable
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

exports.updatePost = async (req, res, next) => {
  const userId = req.userId
  let image = undefined
  const postId = req.body.id

  // Check if file in post
  if (req.file) {
    if (req.file.fieldname === 'image') {
      image = req.file.filename
    }
  }
  try {
    const dataValues = {
      author: userId,
      content: req.body.content,
    }
    if (image) {
      dataValues['image'] = image
    }
    // Update a post and return with values. Image field is overwritten for Redux state
    const result = await Post.update(dataValues, {
      where: { id: postId },
    }).then((updatePost) => {
      console.log(updatePost)
    })
    if (image) {
      dataValues['image'] = process.env.BACKEND_URL + '/images/' + image
    }
    dataValues['id'] = postId
    res.status(200).json({
      result,
      dataValues,
      message: {
        message: 'Post mis à jour avec succès',
        severity: 'success',
      },
    })
  } catch (err) {
    res.status(500).json({
      message: {
        message: err,
        severity: 'error',
      },
    })
  }
}
