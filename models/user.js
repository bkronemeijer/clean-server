'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.belongsTo(models.household)
      user.hasOne(models.taskSchedule)
    }
  };
  user.init({
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    isAdmin: { type: DataTypes.BOOLEAN },
    successes: { type: DataTypes.INTEGER },
    fails: { type: DataTypes.INTEGER },
    householdId: { type: DataTypes.INTEGER },
    wantsMail: { type: DataTypes.BOOLEAN },
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};