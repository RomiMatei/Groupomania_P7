const { authJwt } = require('../middleware')
const likeController = require('../controllers/like.controller')

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    )
    next()
  })

  // Likes routes
  app.post('/api/posts-likes/:id', [authJwt.tokenCheck], likeController.postLike)
}
