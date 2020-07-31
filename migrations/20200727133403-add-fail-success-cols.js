'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'successes', Sequelize.INTEGER );
    await queryInterface.addColumn('users', 'fails', Sequelize.INTEGER );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'successes');
    await queryInterface.removeColumn('users', 'fails');
  }
};
