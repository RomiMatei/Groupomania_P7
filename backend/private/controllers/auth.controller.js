const DbConnect = require('../models/database-connection');
const db = require('../models/index');
const config = require('../config/authentification.conf');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = db.users;
const Role = db.users_roles;

const Op = DbConnect.Sequelize.Op;

exports.signup = (req, res) => {
  // Create new user in database
  User.create({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then((user) => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then((roles) => {
          user.setRoles(roles).then(() => {
            res.json({
              message: 'Félicitation votre compte a été créé avec succès!'
            });
          });
        });
      } else {
        // When you create a user with admin role = 1
        user.setRoles([1]).then(() => {
          res.json({
            message: 'Félicitation votre compte a été créé avec succès!'
          });
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
};

exports.signin = async (req, res) => {
  // Search in database a user with mail address, use findOne function in Sequelize
  try {
    await User.findOne({
      where: {
        email: req.body.email
      }
    }).then((user) => {
      // If the user has not been found return error
      if (!user) {
        return res.status(404).json({ message: 'Adresse email non valide' });
      }
      // Check user password with bcrypt is true
      let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      console.log(user);

      // If user password is not valid return error message
      if (!passwordIsValid) {
        return res.status(401).json({
          token: null,
          message: 'Mot de passe incorrecte'
        });
      }

      // Generate a token with JWT for user session
      let token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 heures
      });

      // Return user informations with role and ID
      Role.findOne({
        where: { userId: user.id },
        attributes: ['roleId'],
        raw: true
      }).then((roles) => {
        let userRole = roles.roleId;

        if (user.image) {
          user.image = process.env.BACKEND_URL + '/images/' + user.image;
        }
        return res.status(200).json({
          id: user.id,
          image: user.image,
          roles: userRole,
          token: token
        });
      });
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
