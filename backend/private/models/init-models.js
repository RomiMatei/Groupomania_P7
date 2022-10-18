var DataTypes = require('sequelize').DataTypes
var _likes = require('./likes')
var _posts = require('./posts')
var _roles = require('./roles')
var _users = require('./users')

function initModels(sequelize) {
  var likes = _likes(sequelize, DataTypes)
  var posts = _posts(sequelize, DataTypes)
  var roles = _roles(sequelize, DataTypes)
  var users = _users(sequelize, DataTypes)

  likes.belongsTo(posts, { as: 'post', foreignKey: 'post_id' })
  posts.hasMany(likes, { as: 'likes', foreignKey: 'post_id' })
  likes.belongsTo(users, { as: 'user', foreignKey: 'user_id' })
  users.hasMany(likes, { as: 'likes', foreignKey: 'user_id' })
  posts.belongsTo(users, { as: 'author_user', foreignKey: 'author' })
  users.hasMany(posts, { as: 'posts', foreignKey: 'author' })

  return {
    likes,
    posts,
    roles,
    users,
  }
}
module.exports = initModels
module.exports.initModels = initModels
module.exports.default = initModels
