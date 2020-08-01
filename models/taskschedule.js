'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class taskSchedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      taskSchedule.belongsTo(models.user)
      taskSchedule.belongsTo(models.task)
    }
  };
  taskSchedule.init({
    deadline: { type: DataTypes.DATE, allowNull: false },
    isDone: { type: DataTypes.BOOLEAN, allowNull: false },
    proofPicture: { type: DataTypes.BLOB },
    taskId: { type: DataTypes.INTEGER },
    userId: { type: DataTypes.INTEGER, allowNull: false },
  }, {
    sequelize,
    modelName: 'taskSchedule',
  });
  return taskSchedule;
};