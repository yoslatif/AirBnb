'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spots extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Spots.belongsTo(models.User, { foreignKey: 'ownerId' });
    }
  }
  Spots.init({
    ownerId: DataTypes.INTEGER,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    lat: DataTypes.DOUBLE,
    lng: DataTypes.DOUBLE,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    avgRating: DataTypes.FLOAT,
    previewImage: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Spots',
  });
  return Spots;
};