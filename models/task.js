'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      task.hasOne(models.taskSchedule)
      task.belongsTo(models.household)
    }
  };
  task.init({
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    householdId: { type: DataTypes.INTEGER, allowNull: false },
  }, {
    sequelize,
    modelName: 'task',
  });
  return task;
};