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
  allUsers.map((userId) => {
    if (userId.image) {
      userId.image = process.env.BACKEND_URL + '/public/images/' + userId.image
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
  console.log(datas)

  // If change avatar
  if (req.file) {
    if (req.file.fieldname === 'image') {
      datas['image'] = req.file.filename
    }
  }

  // If user change his password, crypt new password
  if (datas.password) {
    const newPassword = bcrypt.hashSync(datas.password, 8)
    datas['password'] = newPassword
  }

  // Send news datas to DB
  User.update(datas, {
    where: { id: id },
  })
    .then((user) => {
      if (user == 2) {
        // if user is admin return message
        res.status(200).json({
          message: {
            message: 'Profil Admin mis à jour.',
            severity: 'success',
          },
        })
      } else {
        // if user is not admin return message
        res.status(200).json({
          message: {
            message: `Votre profile est mis à jour!`,
            severity: 'success',
          },
        })
      }
    })
    .catch(() => {
      res.status(500).json({
        message: {
          message: 'Erreur de mise à jour du profile',
          severity: 'error',
        },
      })
    })
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
      where: { roleId: 3, userId: currentUser.user_id },
      raw: true,
    })
  } else {
    currentUser = null
  }

  if (userId !== currentUser.id || currentUserRole.roleId === 3) {
    const deletUser = await User.findByPk(userId)
    try {
      User.destroy({
        where: { id: userId },
      }).then((val) => {
        if (deletUser.image) {
          fs.unlink(`backend/public/images/${deletUser.image}`, (err) => {
            if (err) {
              res.status(500).json({ message: err })
            }
          })
        }
      })

      res.status(200).json({ message: 'Profile supprimé' })
    } catch (err) {
      res.status(500).json({ message: err })
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
