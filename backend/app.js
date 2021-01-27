const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const forumRoutes = require('./routes/forum')
const userRoutes = require('./routes/user')
const responseRoutes = require('./routes/response')

const app = express()
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  next()
})

const db = require("./models");
db.sequelize.sync({ force: true }).then(() => {
  // enlever parametre force: true passer a force: false ou enlever l'objet
  console.log("Drop and re-sync db.");
});

app.use(bodyParser.json())
app.use('/api/auth', userRoutes)
app.use('/api/forum', forumRoutes)
app.use('/api/response', responseRoutes)

module.exports = app
