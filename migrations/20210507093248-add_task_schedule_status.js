'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.addColumn('taskSchedules', 'status', { type: Sequelize.STRING, allowNull: false, defaultValue: 'OPEN'});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('taskSchedules', 'status');
  }
};
