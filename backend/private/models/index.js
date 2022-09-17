const sequelize = require('./database-connection').default;

const initModels = require('../models/init-models');
const database = initModels(sequelize);

module.exports = database;
