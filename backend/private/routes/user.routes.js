const { authJwt } = require('../middleware')
const controller = require('../controllers/user.controller')
const multer = require('../middleware/multer')

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    )
    next()
  })

  app.get('/api/public', controller.allAccess)

  app.get('/api/home', [authJwt.tokenCheck], controller.homePage)

  app.get('/api/users', [authJwt.tokenCheck], controller.allUsers)
  app.get('/api/me', [authJwt.tokenCheck], controller.myProfile)
  app.get('/api/user/:id', [authJwt.tokenCheck], controller.userGet)
  app.delete('/api/user/:id', [authJwt.tokenCheck], controller.userDelete)
  app.put(
    '/api/user-update',
    [authJwt.tokenCheck],
    multer,
    controller.userUpdate
  )

  app.get(
    '/api/mod',
    [authJwt.tokenCheck, authJwt.isModerator],
    controller.moderatorBoard
  )

  app.get(
    '/api/admin',
    [authJwt.tokenCheck, authJwt.isAdmin],
    controller.adminBoard
  )
  app.get('/api/role/:id', [authJwt.tokenCheck], controller.checkRole)
  app.put('/api/role/:id', [authJwt.tokenCheck], controller.setRole)
}
