var DataTypes = require('sequelize').DataTypes
var _likes = require('./likes')
var _posts = require('./posts')
var _roles = require('./roles')
var _users = require('./users')
var _users_roles = require('./users_roles')

function initModels(sequelize) {
  var likes = _likes(sequelize, DataTypes)
  var posts = _posts(sequelize, DataTypes)
  var roles = _roles(sequelize, DataTypes)
  var users = _users(sequelize, DataTypes)
  var users_roles = _users_roles(sequelize, DataTypes)

  likes.belongsTo(posts, { as: 'post', foreignKey: 'post_id' })
  posts.hasMany(likes, { as: 'likes', foreignKey: 'post_id' })
  users_roles.belongsTo(roles, { as: 'role', foreignKey: 'roleId' })
  roles.hasMany(users_roles, { as: 'users_roles', foreignKey: 'roleId' })
  likes.belongsTo(users, { as: 'user', foreignKey: 'user_id' })
  users.hasMany(likes, { as: 'likes', foreignKey: 'user_id' })
  posts.belongsTo(users, { as: 'author_user', foreignKey: 'author' })
  users.hasMany(posts, { as: 'posts', foreignKey: 'author' })
  users_roles.belongsTo(users, { as: 'user', foreignKey: 'userId' })
  users.hasMany(users_roles, { as: 'users_roles', foreignKey: 'userId' })

  return {
    likes,
    posts,
    roles,
    users,
    users_roles,
  }
}
module.exports = initModels
module.exports.initModels = initModels
module.exports.default = initModels
