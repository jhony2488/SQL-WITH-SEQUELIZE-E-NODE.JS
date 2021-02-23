const express = require('express')
const UserController = require('./app/controllers/UserController')
const AddressController = require('./app/controllers/AddressController')
const TechsController = require('./app/controllers/TechsControllers')
const ReportsController = require('./app/controllers/ReportControllers')
const routes = express.Router()

routes.get('/users', UserController.index)
routes.post('/users', UserController.store)

routes.get('/users/:user_id/address', AddressController.index)
routes.post('/users/:user_id/address', AddressController.store)

routes.get('/users/:user_id/techs', TechsController.index)
routes.post('/users/:user_id/techs', TechsController.store)
routes.delete('/users/:user_id/techs', TechsController.delete)

routes.get('/report', ReportsController.show)

module.exports = routes
