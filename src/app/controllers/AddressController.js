const Address = require('../models/Address')
const User = require('../models/User')


module.exports = {
  async index(req, res) {
    const { user_id } = req.params
    User.findByPk(user_id, {
      include: { association: 'addresses' },
    })
      .then((userAddresses) => {
        res.json(userAddresses.addresses)
      })
      .catch((error) => {
        res.json(error)
      })
  },
  async store(req, res) {
    const { user_id } = req.params
    const { zipcode, street, city, number, complement } = req.body
    const user = await User.findOne({
      where: {
        id: user_id,
      },
    })
      .then((user) => {
        if (!user) {
          return res.status(400).json({ error: 'User not Found' })
        }
        if (
          complement == null ||
          complement == undefined ||
          (complement == NaN &&
            zipcode != null &&
            zipcode != undefined &&
            zipcode != NaN &&
            street != null &&
            street != undefined &&
            street != NaN &&
            city != NaN &&
            city != null &&
            city != undefined &&
            number != undefined &&
            number != null &&
            number != NaN)
        ) {
          const address = Address.create({
            zipcode,
            street,
            city,
            number,
            user_id,
          })
            .then((response) => {
              return res.json(response)
            })
            .catch((error) => {
              return res.json({ error })
            })
          return address
        } else if (
          complement != null ||
          complement != undefined ||
          (complement != NaN &&
            zipcode != null &&
            zipcode != undefined &&
            zipcode != NaN &&
            street != null &&
            street != undefined &&
            street != NaN &&
            city != NaN &&
            city != null &&
            city != undefined &&
            number != undefined &&
            number != null &&
            number != NaN)
        ) {
          const address = Address.create({
            zipcode,
            street,
            city,
            number,
            complement,
            user_id,
          })
            .then((response) => {
              return res.json(response)
            })
            .catch((error) => {
              return res.json({ error })
            })
          return address
        }
      })
      .catch((error) => {
        return res.json({ error })
      })
  },
}
