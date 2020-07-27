'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('taskSchedules', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      deadline: {
        allowNull: false,
        type: Sequelize.DATE
      },
      isDone: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      proofPicture: {
        allowNull: false,
        type: Sequelize.BLOB
      },
      taskId: {
        allowNull: false,
        type: Sequelize.NUMBER
      },
      userId: {
        allowNull: false,
        type: Sequelize.NUMBER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('taskSchedules');
  }
};