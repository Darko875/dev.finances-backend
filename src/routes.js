
const express = require('express')
const routes = express.Router()
const SystemController = require('./controllers/SystemController')
const PaymentController = require('./controllers/PaymentController')
const authMiddleware = require('./middlewares/auth')


routes.get('/', SystemController.index)
routes.post('/create', SystemController.create)
routes.post('/authenticate', SystemController.authenticate)
routes.get('/payments',authMiddleware, PaymentController.index)



module.exports = routes;