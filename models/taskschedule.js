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
    }
  };
  taskSchedule.init({
    deadline: { type: DataTypes.DATE, allowNull: false },
    isDone: { type: DataTypes.BOOLEAN, allowNull: false },
    proofPicture: { type: DataTypes.BLOB, allowNull: false },
    taskId: { type: DataTypes.NUMBER, allowNull: false },
    userId: { type: DataTypes.NUMBER, allowNull: false },
  }, {
    sequelize,
    modelName: 'taskSchedule',
  });
  return taskSchedule;
};