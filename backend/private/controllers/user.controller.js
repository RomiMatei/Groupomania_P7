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
    let image = 'https://bootdey.com/img/Content/avatar/avatar7.png'

    if (user.image) {
      if (fs.existsSync(`public/images/${user.image}`)) {
        image = process.env.BACKEND_URL + '/images/' + user.image
      }
    }
    user.image = image
  })
  res.status(200).json(allUsers)
}

exports.userGet = async (req, res, next) => {
  try {
    const id = req.params.id

    if (id) {
      const user = await User.findByPk(req.params.id)
      let image = 'https://bootdey.com/img/Content/avatar/avatar7.png'
      if (user.image) {
        if (fs.existsSync(`public/images/${user.image}`)) {
          image = process.env.BACKEND_URL + '/images/' + user.image
        }
      }
      user.image = image

      res.status(200).json(user)
    }
  } catch (err) {
    res.status(500).json('Utilisateur non trouvé!')
  }
}

exports.myProfile = async (req, res, next) => {
  let user
  if (req) {
    const token = req.headers['x-access-token']
    const decoded = await jwt.verify(token, config.secret)
    user = await User.findByPk(decoded.id)
    let image = 'https://bootdey.com/img/Content/avatar/avatar7.png'
    if (user.image) {
      if (fs.existsSync(`public/images/${user.image}`)) {
        image = process.env.BACKEND_URL + '/images/' + user.image
      }
    }
    user.image = image

    res.status(200).json(user)
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
        if (currentUser.image) {
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

    let image = 'https://bootdey.com/img/Content/avatar/avatar7.png'
    if (datas['image']) {
      if (fs.existsSync(`public/images/${datas['image']}`)) {
        image = process.env.BACKEND_URL + '/images/' + datas['image']
      }
    }
    dataValues['image'] = image

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
