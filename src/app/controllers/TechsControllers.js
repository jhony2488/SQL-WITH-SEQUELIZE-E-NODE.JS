const User = require('../models/User')
const Techs = require('../models/Tech')

module.exports = {
  async index(req, res) {
    const { user_id } = req.params
    User.findByPk(user_id, {
      include: { association: 'techs' },
    })
      .then((userTechs) => {
        res.json(userTechs)
      })
      .catch((error) => {
        res.json(error)
      })
  },
  async store(req, res) {
    const { user_id } = req.params
    const { name } = req.body
    const user = await User.findByPk(user_id)
    if (!user) {
      return res.status(400).json({ error: 'User not Found' })
    }
    const [tech] = await Techs.findOrCreate({
      where: {
        name,
      },
    })
    await user.addTech(tech)

    return res.json(tech)
  },
  async delete(req, res) {
    const { user_id } = req.params
    const { name } = req.body
    const user = await User.findByPk(user_id)
    if (!user) {
      return res.status(400).json({ error: 'User not Found' })
    }
    const tech = await Techs.findOne({
      where: {
        name, 
      },
    })
    await user.removeTech(tech)

    return res.json()
  },
}
