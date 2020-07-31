'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('households', [{
      nickName: 'Koningsweg 106',
      startDate: 1,
      recurrence: 7,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nickName: 'Freddy Fish',
      startDate: 1,
      recurrence: 7,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nickName: 'Pingu',
      startDate: 1,
      recurrence: 14,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nickName: 'Henk & Ingrid',
      startDate: 1,
      recurrence: 7,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('households', null, {});
  }
};
