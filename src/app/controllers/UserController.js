const User = require('../models/User')

module.exports = {
  async index(req, res) {
    User.findAll()
      .then((users) => {
        res.json(users)
      })
      .catch((error) => {
        res.json(error)
      })
  },
  async store(req, res) {
    const { name, email, age } = req.body

    const user = User.create({ name, email, age })
      .then((user) => {
        res.json(user)
      })
      .catch((error) => {
        res.json(error)
      })
  },
}
