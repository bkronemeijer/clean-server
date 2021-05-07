'use strict';
const moment = require('moment')

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('taskSchedules', [{
       deadline: moment().add(1, 'd').toDate(),
       isDone: false,
       proofPicture: null,
       userId: 1,
       taskId: 1,
       createdAt: new Date(),
      updatedAt: new Date()
     },{
      deadline: moment().add(2, 'd').toDate(),
      isDone: false,
      proofPicture: null,
      userId: 2,
      taskId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      deadline: moment().add(3, 'd').toDate(),
      isDone: false,
      proofPicture: null,
      userId: 3,
      taskId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      deadline: moment().subtract(1, 'd').toDate(),
      isDone: false,
      proofPicture: null,
      userId: 4,
      taskId: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      deadline: moment().subtract(2, 'd').toDate(),
      isDone: false,
      proofPicture: null,
      userId: 5,
      taskId: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      deadline: moment().subtract(3, 'd').toDate(),
      isDone: false,
      proofPicture: null,
      userId: 6,
      taskId: 6,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      deadline: moment().add(1, 'd').toDate(),
      isDone: false,
      proofPicture: null,
      userId: 7,
      taskId: 7,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('taskSchedules', null, {});
  }
};
