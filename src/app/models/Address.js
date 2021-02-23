const { Model, DataTypes } = require('sequelize')

class Address extends Model {
  static init(sequelize) {
    super.init(
      {
        zipcode: DataTypes.STRING,
        street: DataTypes.STRING,
        city: DataTypes.INTEGER,
        number: DataTypes.STRING,
        complement: DataTypes.STRING,
        user_id: DataTypes.INTEGER,
      },
      {
        sequelize,
        tableName: 'addresses',
      }
    )
  }
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'owner' })
  }
}
module.exports = Address
