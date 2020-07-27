'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('tasks', [{
       title: 'badkamer',
       description: 'je moet schoonmaken',
       householdId: 1,
       createdAt: new Date(),
      updatedAt: new Date()
     },{
      title: 'gang',
      description: 'stofzuigen en dweilen',
      householdId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      title: 'badkamer',
      description: 'goed schrobben bij de douche!',
      householdId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      title: 'wc',
      description: 'allebei de wcs',
      householdId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      title: 'bassie',
      description: 'haren kammen, tenzij hij kaal is',
      householdId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      title: 'vuilnis',
      description: 'aan de weg zetten',
      householdId: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      title: 'hal',
      description: 'schoenen poetsen',
      householdId: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('tasks', null, {});
  }
};
