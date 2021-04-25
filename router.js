const { Router } = require('express')
const controller = require('./controllers')

module.exports = () => Router({ mergeParams: true })
  .get('/uploads/:file', controller.raw)
  .put('/uploads', controller.generateRandomObjectsFile)
