'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bathbombs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  bathbombs.init({
    style: DataTypes.STRING,
    image: DataTypes.STRING,
    description: DataTypes.TEXT,
    ingredients: DataTypes.TEXT,
    cost: DataTypes.NUMERIC,
    pinterest: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'bathbombs',
  });
  return bathbombs;
};