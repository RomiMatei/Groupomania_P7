const sequelize = require("./connection-Db");

const Sequelize = require("sequelize");
const { SequelizeScopeError } = require("sequelize");

const initModels = require('../models/init-models');
const database = initModels(sequelize);

module.exports = database;
