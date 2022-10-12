const express = require('express')
const cors = require('cors')
const path = require('path')

require('dotenv').config()

const app = express()

var corsOptions = {
  origin: [
    'http://127.0.0.1:3000',
    'http://localhost:3000',
    'http://127.0.0.1:3001',
    'http://localhost:3001',
    'http://127.0.0.1:8081',
    'http://localhost:8081',
  ],
  optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// database
const sequelize = require('./private/models/database-connection')

sequelize.sync()

app.get('/', (req, res) => {
  res.json({ message: 'Bienvenue chez Groupomania.' })
})

// routes
require('./private/routes/auth.routes')(app)
require('./private/routes/user.routes')(app)
require('./private/routes/post.routes')(app)
require('./private/routes/like.routes')(app)

app.use(express.static(path.join(__dirname, '/public')))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Serveur écoute sur le port ${PORT}.`)
})

module.exports = app
