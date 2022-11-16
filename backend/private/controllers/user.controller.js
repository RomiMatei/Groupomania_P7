const config = require('../config/authentification.conf')
var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')
const fs = require('fs')

const Sequelize = require('sequelize')

const db = require('../models/index')
const User = db.users
const Role = db.user_roles

exports.allUsers = async (req, res, next) => {
  let userId = req.userId

  const allUsers = await User.findAll({
    where: {
      id: {
        [Sequelize.Op.not]: userId,
      },
    },
    raw: true,
  })
  allUsers.map((user) => {
    if (user.image) {
      user.image = process.env.BACKEND_URL + '/images/' + user.image
    }
  })
  res.status(200).json(allUsers)
}

exports.userGet = async (req, res, next) => {
  try {
    const id = req.params.id

    if (id) {
      const currentUser = await User.findByPk(req.params.id)
      if (currentUser.image) {
        currentUser.image =
          process.env.BACKEND_URL + '/images/' + currentUser.image
      }

      res.status(200).json(currentUser)
    }
  } catch (err) {
    res.status(500).json('Utilisateur non trouvé!')
  }
}

exports.myProfile = async (req, res, next) => {
  let userId
  if (req) {
    const token = req.headers['x-access-token']
    const decoded = await jwt.verify(token, config.secret)
    userId = await User.findByPk(decoded.id)
    if (userId.image) {
      userId.image = process.env.BACKEND_URL + '/images/' + userId.image
    }
    if (userId.image_cover) {
      userId.image_cover =
        process.env.BACKEND_URL + '/images/' + userId.image_cover
    }
    res.status(200).json(userId)
  } else {
    res.status(500).json('Utilisateur non trouvé!')
  }
}

exports.userUpdate = async (req, res, next) => {
  const id = req.body.id
  const datas = req.body

  try {
    // If change avatar
    if (req.file) {
      if (req.file.fieldname === 'image') {
        datas['image'] = req.file.filename

        // Remove old image
        const currentUser = await User.findByPk(id)
        try {
          fs.unlink(`public/images/${currentUser.image}`, (err) => {
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
    }

    // If user change his password, crypt new password
    if (datas.password) {
      const newPassword = bcrypt.hashSync(datas.password, 8)
      datas['password'] = newPassword
    }

    const dataValues = {}

    // Send news datas to DB
    const result = await User.update(datas, {
      where: { id: id },
    })

    if (datas['image']) {
      dataValues['image'] =
        process.env.BACKEND_URL + '/images/' + datas['image']
    }

    res.status(200).json({
      result,
      dataValues,
      message: {
        message: `Votre profile est mis à jour!`,
        severity: 'success',
      },
    })
  } catch (err) {
    res.status(500).json({
      message: {
        message: 'Erreur de mise à jour du profile',
        severity: 'error',
      },
    })
  }
}

exports.userDelete = async (req, res) => {
  const userId = req.params.id
  let currentUser
  let currentUserRole

  if (req) {
    const token = req.headers['x-access-token']
    const decoded = await jwt.verify(token, config.secret)
    currentUser = await User.findByPk(decoded.id)
    currentUserRole = await Role.findOne({
      where: { roleId: 2, userId: currentUser.user_id },
      raw: true,
    })
  } else {
    currentUser = null
  }

  if (userId !== currentUser.id || currentUserRole.role === 2) {
    const deleteUser = await User.findByPk(userId)
    try {
      User.destroy({
        where: { id: userId },
      }).then(() => {
        if (deleteUser.image) {
          fs.unlink(`public/images/${deleteUser.image}`, (err) => {
            if (err) {
              res.status(500).json({
                message: {
                  message: err,
                  severity: 'error',
                },
              })
            }
          })
        }
      })

      res.status(200).json({
        message: {
          message: 'Profile supprimé',
          severity: 'success',
        },
      })
    } catch (err) {
      res.status(500).json({
        message: {
          message: 'Impossible de supprimer le profil',
          severity: 'error',
        },
      })
    }
  }
}

exports.checkRole = (req, res) => {
  Role.findOne({
    where: {
      userId: req.params.id,
    },
  })
    .then((result) => {
      res.status(200).json(result)
    })
    .catch((err) => {
      res.status(500).json({ message: err })
    })
}

exports.setRole = (req, res) => {
  const id = req.params.id
  var datas = req.body

  Role.update(datas, {
    where: { userId: id },
  })
    .then(() => {
      res.status(200).json({ message: 'Role mis à jour!' })
    })
    .catch(() => {
      res.status(500).json({
        message: 'Erreur de mise à jour du rôle',
      })
    })
}
