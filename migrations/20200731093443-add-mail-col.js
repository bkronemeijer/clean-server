'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'wantsMail', Sequelize.BOOLEAN );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropColumn('users', 'wantsMail');
  }
};
