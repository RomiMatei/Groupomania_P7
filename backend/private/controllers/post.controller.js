const config = require('../config/auth.config');
var jwt = require('jsonwebtoken');
const fs = require('fs');
const db = require('../models/index');
const Post = db.posts;
const User = db.users;

exports.createPost = async (req, res, next) => {
  let userId;
  let image = null;

  // Check if user authorized to create a post
  if (req) {
    const token = req.headers['x-access-token'];
    const decoded = await jwt.verify(token, config.secret);
    userId = await User.findByPk(decoded.id);
  } else {
    userId = null;
  }

  if (req.file) {
    if (req.file.fieldname === 'image') {
      image = req.file.filename;
    }
  }

  try {
    // Try to create post
    const response = await Post.create({
      author: userId.get('user_id'),
      title: req.body.title,
      content: req.body.content,
      post_created: new Date().getTime(),
      image: image
    });
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    // Find post_id in DB
    const post = await Post.findByPk(req.params.id);
    const image = post.image;

    // Delete post in DB
    const result = await Post.destroy({
      where: { post_id: req.params.id }
    }).then((val) => {
      // If image in the post, delete file in folder
      if (image) {
        fs.unlink(`public/images/${image}`, (err) => {
          if (err) {
            res.status(500).json({ message: err });
          }
        });
      }
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.allPosts = async (req, res, next) => {
  try {
    // Show all posts list
    const allPostsDb = await Post.findAll({
      attributes: ['post_id'],
      order: [['post_created', 'DESC']],
      raw: true
    });

    Promise.all(allPostsDb).then((values) => {
      res.status(200).json(values);
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.onePost = async (req, res, next) => {
  try {
    // Show only one post
    const PostsDb = await Post.findByPk(req.params.id, { raw: true });
    if (PostsDb.image) {
      const imageUrl = process.env.BACKEND_URL + '/images/' + PostsDb.image;
      PostsDb.image = imageUrl;
    }
    res.status(200).json(PostsDb);
  } catch (err) {
    console.log(err);

    res.status(500).json({ message: err });
  }
};

exports.myPosts = async (req, res, next) => {
  let user_id = req.params.id;
  let userId = null;

  if (req) {
    userId = await User.findByPk(user_id);
  } else {
    userId = null;
  }

  try {
    const allPostsDb = await Post.findAll({
      attributes: ['post_id'],
      where: { author: userId.user_id },
      order: [['post_created', 'DESC']],
      raw: true
    });

    Promise.all(allPostsDb).then((values) => {
      let result = values;

      res.status(200).json(result);
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
