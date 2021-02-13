
const express = require('express')
const routes = express.Router()
const SystemController = require('./controllers/SystemController')
const PaymentController = require('./controllers/PaymentController')
const authMiddleware = require('./middlewares/auth')
const { Router } = require('express')


routes.get('/', SystemController.index)
routes.post('/create', SystemController.create)
routes.post('/authenticate', SystemController.authenticate)
routes.post('/forgot-password', SystemController.forgot_password)
routes.post('/reset-password', SystemController.reset_password)

routes.get('/payments', authMiddleware, PaymentController.index)
routes.post('/create-payment', authMiddleware, PaymentController.create)
routes.post('/payments/:id', authMiddleware, PaymentController.delete)


module.exports = routes;