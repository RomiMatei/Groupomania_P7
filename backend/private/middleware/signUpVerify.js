const db = require('../models/index');
const ROLES = db.ROLES;
const User = db.users;

checkRolesExist = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).json({
          message: "Erreur! Ce rôle n'existe pas = " + req.body.roles[i]
        });
        return;
      }
    }
  }

  next();
};

checkDuplicateEmail = (req, res, next) => {
  // Email
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then((user) => {
    if (user) {
      res.status(400).json({
        message: 'Cette adresse mail existe déjà!'
      });
      return;
    }
    next();
  });
};

const verifySignUp = {
  checkDuplicateEmail: checkDuplicateEmail,
  checkRolesExist: checkRolesExist
};

module.exports = verifySignUp;
