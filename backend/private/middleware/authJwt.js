const config = require('../config/authentification.conf.js')
const jwt = require('jsonwebtoken')
const db = require('../models/index')
const User = db.users

tokenCheck = (req, res, next) => {
  const token = req.headers['x-access-token']

  if (!token) {
    return res.status(403).json({
      message: {
        message: 'Access denied! Please try again.',
        severity: 'error',
      },
    })
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(511).json({
          message: 'Expired session!',
        })
      } else {
        return res.status(401).json({
          message: 'Not authorized!',
        })
      }
    }
    if (decoded !== undefined) {
      req.userId = decoded.id
    }
    next()
  })
}

isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'admin') {
          next()
          return
        }
      }

      res.status(403).json({
        message: 'Require Admin Role!',
      })
      return
    })
  })
}

const authJwt = {
  tokenCheck: tokenCheck,
  isAdmin: isAdmin,
}
module.exports = authJwt
