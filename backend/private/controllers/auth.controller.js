const DbConnect = require('../models/database-connection');
const db = require('../models/index');
const config = require('../config/authentification.conf');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = db.users;
const Role = db.user_roles;

const Op = DbConnect.Sequelize.Op;

exports.signup = (req, res) => {
  // Create new user in database
  User.create({
    name: req.body.name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    birth_date: req.body.birth_date,
    joined: new Date().getTime()
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
              message:
                'Félicitation votre compte a été créé avec succès!'
            });
          });
        });
      } else {
        // When you create a user with admin role = 1
        user.setRoles([1]).then(() => {
          res.json({
            message:
              'Félicitation votre compte a été créé avec succès!'
          });
        });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

exports.signin = (req, res) => {
  // Search in database a user with mail address, use findOne function in Sequelize
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then((user) => {
      // If the user has not been found return error
      if (!user) {
        res.status(404).json({ message: 'User not found.' });
      }
      // Check user password with bcrypt is true
      let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      // If user password is not valid return error message
      if (!passwordIsValid) {
        res.status(401).json({
          accessToken: null,
          message: 'Password wrong!'
        });
      }

      // Generate a token with JWT for user session
      let token = jwt.sign({ id: user.user_id }, config.secret, {
        expiresIn: 86400 // 24 heures
      });

      // Return user informations with role and ID
      let authorities = [];
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push('ROLE_' + roles[i].name.toUpperCase());
        }
        if (user.image) {
          user.image = process.env.BACKEND_URL + '/images/' + user.image;
        }
        res.status(200).json({
          user_id: user.user_id,
          name: user.name,
          last_name: user.last_name,
          image: user.image,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};
