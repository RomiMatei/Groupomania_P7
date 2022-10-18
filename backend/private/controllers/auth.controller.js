const db = require('../models/index')
const config = require('../config/authentification.conf')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = db.users

exports.signup = (req, res) => {
  // Create new user in database
  User.create({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    role: 1,
  })
    .then(() => {
      res.json({
        message: {
          message: 'Félicitation votre compte a été créé avec succès!',
          severity: 'success',
        },
      })
    })
    .catch((err) => {
      res.status(500).json({ message: err.message, severity: 'error' })
    })
}

exports.signin = async (req, res) => {
  // Search in database a user with mail address, use findOne function in Sequelize
  try {
    await User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((user) => {
      // If the user has not been found return error
      if (!user) {
        return res
          .status(404)
          .json({ message: 'Adresse email non valide', severity: 'error' })
      }
      // Check user password with bcrypt is true
      let passwordIsValid = bcrypt.compareSync(req.body.password, user.password)

      // If user password is not valid return error message
      if (!passwordIsValid) {
        return res.status(401).json({
          message: {
            message: 'Mot de passe incorrecte',
            severity: 'error',
          },
        })
      }

      // Generate a token with JWT for user session
      let token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      })

      // return user image url with backend variable
      if (user.image) {
        user.image = process.env.BACKEND_URL + '/images/' + user.image
      }
      return res.status(200).json({
        id: user.id,
        email: user.email,
        image: user.image,
        roles: user.role,
        token: token,
      })
    })
  } catch (err) {
    res
      .status(401)
      .json({ message: { message: err.message, severity: 'error' } })
  }
}
