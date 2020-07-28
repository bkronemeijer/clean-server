'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('taskSchedules', [{
       deadline: new Date(2020, 7, 3, 22, 0, 0),
       isDone: false,
       proofPicture: null,
       userId: 1,
       taskId: 1,
       householdId: 1,
       createdAt: new Date(),
      updatedAt: new Date()
     },{
      deadline: new Date(2020, 7, 3, 22, 0, 0),
      isDone: false,
      proofPicture: null,
      userId: 1,
      taskId: 1,
      householdId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      deadline: new Date(2020, 7, 3, 22, 0, 0),
      isDone: false,
      proofPicture: null,
      userId: 2,
      taskId: 2,
      householdId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      deadline: new Date(2020, 7, 3, 22, 0, 0),
      isDone: false,
      proofPicture: null,
      userId: 2,
      taskId: 2,
      householdId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      deadline: new Date(2020, 7, 10, 22, 0, 0),
      isDone: false,
      proofPicture: null,
      userId: 3,
      taskId: 3,
      householdId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      deadline: new Date(2020, 7, 10, 22, 0, 0),
      isDone: false,
      proofPicture: null,
      userId: 4,
      taskId: 4,
      householdId: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      deadline: new Date(2020, 7, 10, 22, 0, 0),
      isDone: false,
      proofPicture: null,
      userId: 4,
      taskId: 4,
      householdId: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('taskSchedules', null, {});
  }
};
