const Sequelize = require('sequelize')
const dbConfig = require('../config/database')
const User = require('../app/models/User')
const Address = require('../app/models/Address')
const Techs = require('../app/models/Tech')
const connection = new Sequelize(dbConfig)

User.init(connection)
Address.init(connection)
Techs.init(connection)

User.associate(connection.models)
Address.associate(connection.models)
Techs.associate(connection.models)

module.exports = connection
