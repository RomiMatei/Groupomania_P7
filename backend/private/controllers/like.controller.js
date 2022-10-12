const config = require('../config/authentification.conf')
var jwt = require('jsonwebtoken')
const db = require('../models/index')
const Post = db.posts
const Like = db.likes
const User = db.users

exports.postLike = async (req, res, next) => {
  const userId = req.userId
  let postId = req.params.id

  if (req) {
    const token = req.headers['x-access-token']
    const decoded = await jwt.verify(token, config.secret)

    userId = await User.findByPk(decoded.id)
  } else {
    userId = null
  }

  const likeDislike = await Like.findAll({
    where: { post_id: postId, user_id: userId.get('id') },
    raw: true,
  })
  const result = { userLiked: 0 }
  // console.log(likeDislike)
  if (likeDislike.length > 0) {
    await Like.destroy({
      where: { post_id: postId, user_id: userId.get('id') },
    })
    result['userLiked'] = 0
  } else {
    await Like.create({
      post_id: postId,
      user_id: userId.get('id'),
      like_date: new Date().getTime(),
    })
    result['userLiked'] = 1
  }

  const likeDislikeCount = await Like.findAll({
    where: { post_id: postId },
    raw: true,
  })

  result['countVals'] = likeDislikeCount.length

  return res.status(200).json(result)
}
