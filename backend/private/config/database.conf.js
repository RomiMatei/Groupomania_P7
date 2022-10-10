module.exports = {
  HOST: '127.0.0.1',
  USER: 'groupomania',
  PASSWORD: '000000',
  DB: 'p7_groupomania',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
}
