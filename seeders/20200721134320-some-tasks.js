'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('tasks', [{
       title: 'badkamer',
       description: 'je moet schoonmaken',
       householdId: 1,
       userId: 11,
       createdAt: new Date(),
      updatedAt: new Date()
     },{
      title: 'gang',
      description: 'stofzuigen en dweilen',
      householdId: 1,
      userId: 12,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      title: 'badkamer',
      description: 'goed schrobben bij de douche!',
      householdId: 2,
      userId: 15,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      title: 'wc',
      description: 'allebei de wcs',
      householdId: 2,
      userId: 15,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      title: 'bassie',
      description: 'haren kammen, tenzij hij kaal is',
      householdId: 3,
      userId: 16,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      title: 'vuilnis',
      description: 'aan de weg zetten',
      householdId: 4,
      userId: 19,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      title: 'hal',
      description: 'schoenen poetsen',
      householdId: 4,
      userId: 20,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('tasks', null, {});
  }
};
