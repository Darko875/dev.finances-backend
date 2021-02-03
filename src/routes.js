
const express = require('express')
const routes = express.Router()
const SystemController = require('./controllers/SystemController')


routes.get('/', SystemController.index)
routes.post('/create', SystemController.create)
routes.post('/authenticate', SystemController.authenticate)



module.exports = routes;