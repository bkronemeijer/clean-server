const schedule = require('node-schedule');
const moment = require('moment')
const Sequelize = require('sequelize')
const Op = Sequelize.Op;
const TaskSchedule = require("../models").taskSchedule
const Household = require("../models").household
const Task = require("../models").task
const User = require("../models").user
const WorkerTest = require("../models").workerTest

const getAllHouseholds = async() => {
  try {
    const households = await Household.findAll({raw: true})

    return households
  } catch (error) {
    console.log(error)
  }
}

const getMostCurrentTasks = async(householdId, recurrence) => {
  try {
    const recentTasks = await TaskSchedule.findAll({raw: true, where: {userId: householdId, deadline: {[Op.between]: [new Date(), moment().add(recurrence, 'd')] }}})
    // const recentTasks = await TaskSchedule.findAll({raw: true, where: {userId: householdId, deadline: {[Op.between]: [moment().subtract(recurrence, 'd'), new Date()] }}})

    return recentTasks
  } catch (error) {
    console.log(error)
  }
}

const deadlineComplete = async(isDone, userId) => {
  console.log("deadline complete")
  let addToUser
  const userToUpdate = await User.findByPk(userId)

  if (isDone) {
    addToUser = await userToUpdate.update({successes: userToUpdate.successes + 1})
  } else if (!isDone) {
    addToUser = await userToUpdate.update({fails: userToUpdate.fails + 1})
  }
}

// const newRow = await TaskSchedule.create({deadline: moment().add(7, 'd'), isDone: false, proofPicture: null, taskId: 1, userId: 1})

// const i = schedule.scheduleJob('0 22 * * *', async function(){       // actual line -> tests every day at 22h
const i = schedule.scheduleJob('10 * * * * *', async function(){        // test line -> tests every 10 seconds past the minute
  // console.log(moment().subtract(7, 'd')) // - 1 week
  // console.log(moment().add(7, 'd')) // + 1 week
  const households = await getAllHouseholds()

  for (const household of households) {
    const tasks = await getMostCurrentTasks(household.id, household.recurrence)
    for (const task of tasks) {
      console.log("AAP NOOT PIES", task.deadline)
      if (moment(task.deadline).isSame(moment(), 'day')) { // bit of leeway so that it must surely work if the deadline is today
        console.log('check for deadline')
        deadlineComplete(task.isDone, task.userId)
      } else if (moment(task.deadline).isBetween(moment().add(1, 'h'), moment().add(25, 'h'))){
        console.log('mail the users')
      } 
    }
  }
});

module.exports = i