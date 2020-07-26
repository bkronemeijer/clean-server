'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class household extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      household.hasMany(models.user)
      household.hasMany(models.task)
    }
  };
  household.init({
    nickName: { type: DataTypes.STRING, allowNull: false, unique:true},
    startDate: { type: DataTypes.DATE, allowNull: false},
    recurrence: { type: DataTypes.INTEGER, allowNull: false}
  }, {
    sequelize,
    modelName: 'household',
  });
  return household;
};