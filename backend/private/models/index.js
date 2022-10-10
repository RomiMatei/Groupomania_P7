const sequelize = require('./database-connection')

const initModels = require('../models/init-models')
const database = initModels(sequelize)

module.exports = database
