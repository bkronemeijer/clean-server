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
        type: Sequelize.BLOB
      },
      taskId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "tasks",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      },
      householdId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "households",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
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