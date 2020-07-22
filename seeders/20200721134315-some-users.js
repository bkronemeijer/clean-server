'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('users', [{
       name: 'Bob',
       email: "bob@pluis.nl",
       password: "test123",
       isAdmin: true,
       householdId: 1,
       createdAt: new Date(),
      updatedAt: new Date()
     },{
      name: 'Jos',
      email: "jos@pluis.nl",
      password: "test1234",
      isAdmin: true,
      householdId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Eddy',
      email: "eddy@pluis.nl",
      password: "test12345",
      isAdmin: true,
      householdId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Betty',
      email: "betty@q42.nl",
      password: "betty123",
      isAdmin: true,
      householdId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Rens',
      email: "rens@hi.nl",
      password: "rens123",
      isAdmin: true,
      householdId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Bassie',
      email: "bassie@ba.nl",
      password: "hoi123",
      isAdmin: true,
      householdId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Adriaan',
      email: "adriaan@ba.nl",
      password: "adriaan123",
      isAdmin: true,
      householdId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Robbie',
      email: "robot@ba.nl",
      password: "rob123",
      isAdmin: true,
      householdId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Henk',
      email: "henk@burger.nl",
      password: "test423",
      isAdmin: true,
      householdId: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Ingrid',
      email: "ingrid@burger.nl",
      password: "test523",
      isAdmin: true,
      householdId: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('users', null, {});
  }
};
