const db = require('../models/index')
const Like = db.likes

exports.postLike = async (req, res, next) => {
  const userId = req.userId
  let postId = req.params.id

  // find with sequelize all likes in this post with post_id and user_id
  const likeDislike = await Like.findAll({
    where: { post_id: postId, user_id: userId },
    raw: true,
  })
  const result = { userLiked: 0 }

  // if user has a like remove his like else create like
  if (likeDislike.length > 0) {
    await Like.destroy({
      where: { post_id: postId, user_id: userId },
    })
    result['userLiked'] = 0
  } else {
    await Like.create({
      post_id: postId,
      user_id: userId,
      like_date: new Date().getTime(),
    })
    result['userLiked'] = 1
  }

  // Count total likes for this post
  const likeDislikeCount = await Like.findAll({
    where: { post_id: postId },
    raw: true,
  })

  result['countVals'] = likeDislikeCount.length

  return res.status(200).json(result)
}
