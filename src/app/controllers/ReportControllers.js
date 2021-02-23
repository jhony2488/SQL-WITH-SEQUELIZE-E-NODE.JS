const { Op } = require('sequelize')
const User = require('../models/User')

module.exports = {
  async show(req, res) {
    //encontrar todos os usuarios com email que termina com @rocketeseat.com.br
    //de todos os usuarios quero buscar os que moram na rua guilherme paiva
    //Desses usuarios eu quero buscar as tecnilogias que comecem com react
    const users = await User.findAll({
      attributes: ['name', 'email'],
      where: {
        email: {
          [Op.like]: '%@rocketeseat.com.br',
        },
      },
      include: [
        {
          association: 'addresses',
          where: {
            street: 'rua guilherme paiva',
          },
        },
        {
          association: 'techs',
          required: false,
          where: {
            name: {
              [Op.like]: 'React%',
            },
          },
        },
      ],
    })
    res.json(users)
  },
}
