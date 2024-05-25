'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Service.init({
    service_name: DataTypes.STRING,
    descripcion: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Service',
  });
  return Service;
};