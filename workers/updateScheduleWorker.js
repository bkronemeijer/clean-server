const schedule = require('node-schedule');
const moment = require('moment')
const Sequelize = require('sequelize')
const Op = Sequelize.Op;
const TaskSchedule = require("../models").taskSchedule
const Household = require("../models").household
const Task = require("../models").task
const User = require("../models").user
const WorkerTest = require("../models").workerTest;
const { sequelize } = require('../models');

const getAllHouseholds = async() => {
  try {
    const households = await Household.findAll({raw: true})

    return households
  } catch (error) {
    console.log(error)
  }
}

const getTasksThatHaveExceededDeadline = async() => {
  try {
    const recentTasks = await TaskSchedule.findAll({raw: true, where: { deadline: { [Op.lt]: new Date() }, status: { [Op.in]: ['OPEN', 'MAILED'] } }})

    return recentTasks
  } catch (error) {
    console.log(error)
  }
}

const deadlineComplete = async(isDone, taskScheduleId, userId) => {
  const userToUpdate = await User.findByPk(userId)
  const taskSchedule = await TaskSchedule.findByPk(taskScheduleId);

  sequelize.transaction(async function(t) {
    if (isDone) {
      await userToUpdate.update({successes: userToUpdate.successes + 1}, { transaction: t})
    } else if (!isDone) {
      await userToUpdate.update({fails: userToUpdate.fails + 1}, { transaction: t})
    }

    await taskSchedule.update({ status: 'DONE' }, { transaction: t})
  })
}

const createNewSchedule = async(taskScheduleId, householdId, recurrence) => {
  // get array of users that belong to this household
  try {
    // which userId did which taskId this week
    const users = await User.findAll({raw: true, where: {householdId}, attributes: ["id"], include: {model: TaskSchedule, where: {deadline: {[Op.between]: [new Date(), moment().add(recurrence, 'd')] }}, attributes: ["id", "taskId"]}})
    console.log(users)
    const userArray = users.map(user => user.id)
    // const taskArray = users.map(user => user['taskSchedule.id'])
    userArray.sort((a, b) => a - b)
    // taskArray.sort((a, b) => a - b)
    console.log(userArray)


    // which is the next in line in index
    const currentTask = users.find(user => {
      return user['taskSchedule.id'] === taskScheduleId
    })
    console.log(currentTask)

    const currentIndex = userArray.indexOf(currentTask.id)
    if (currentIndex === -1 || currentIndex === userArray.length - 1) {
      newIndex = 0
    } else if (currentIndex !== -1 || currentIndex !== userArray.length - 1){
      // if it is the last index, go back to index 0
      newIndex = currentIndex + 1
    }
    const newUser = userArray[newIndex]
    console.log(newIndex, newUser)

    const newRow = await TaskSchedule.create({deadline: moment().add(recurrence, 'd'), isDone: false, proofPicture: null, taskId: currentTask['taskSchedule.taskId'], userId: newUser})
  } catch (error) {
    console.log(error)
  }
}

const update = schedule.scheduleJob('*/5 * * * * *', async function(){
  const tasks = (await getTasksThatHaveExceededDeadline()) || []

  tasks.forEach(async (task) => {
      await deadlineComplete(task.isDone, task.id, task.userId)
  })
})

module.exports = update