const { authJwt } = require('../middleware')
const postController = require('../controllers/post.controller')
const multer = require('../middleware/multer')

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    )
    next()
  })

  // Posts
  app.get('/api/posts-all', [authJwt.tokenCheck], postController.allPosts)
  app.get('/api/posts-get/:id', [authJwt.tokenCheck], postController.onePost)
  app.get('/api/posts-my/:id', [authJwt.tokenCheck], postController.myPosts)
  app.post(
    '/api/posts-create',
    [authJwt.tokenCheck],
    multer,
    postController.createPost
  )
  // app.put('/api/posts-update', [authJwt.tokenCheck], postController.updatePost);
  app.delete(
    '/api/posts-delete/:id',
    [authJwt.tokenCheck],
    postController.deletePost
  )
}
