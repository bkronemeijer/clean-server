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
    const recentTasks = await TaskSchedule.findAll({raw: true, where: {deadline: {[Op.between]: [new Date(), moment().add(recurrence, 'd')] }}, include: {model: User, where: {householdId}}})
    // const recentTasks = await TaskSchedule.findAll({raw: true, where: {userId: householdId, deadline: {[Op.between]: [new Date(), moment().add(recurrence, 'd')] }}})            // test string
    // const recentTasks = await TaskSchedule.findAll({raw: true, where: {userId: householdId, deadline: {[Op.between]: [moment().subtract(recurrence, 'd'), new Date()] }}})       // should be the eventual string

    return recentTasks
  } catch (error) {
    console.log(error)
  }
}

const mailUsers = async() => {
  console.log("mail the users")
}

const deadlineComplete = async(isDone, taskScheduleId, userId, householdId, recurrence) => {
  console.log("in the deadline function now", taskScheduleId)
  let addToUser
  const userToUpdate = await User.findByPk(userId)

  if (isDone) {
    addToUser = await userToUpdate.update({successes: userToUpdate.successes + 1})
  } else if (!isDone) {
    addToUser = await userToUpdate.update({fails: userToUpdate.fails + 1})
  }

  createNewSchedule(taskScheduleId, householdId, recurrence)
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


// const i = schedule.scheduleJob('0 22 * * *', async function(){       // actual line -> tests every day at 22h
const update = schedule.scheduleJob('10 * * * * *', async function(){        // test line -> tests every 10 seconds past the minute
  const households = await getAllHouseholds();

  households.forEach(async (household) => {
    const tasks = await getMostCurrentTasks(household.id, household.recurrence)

    tasks.forEach(async (task) => {
      if (moment(task.deadline).isSame(moment(), 'day')) { // bit of leeway so that it must surely work if the deadline is today
        await deadlineComplete(task.isDone, task.id, task.userId, task['user.householdId'], household.recurrence)
      } else if (moment(task.deadline).isBetween(moment().add(1, 'h'), moment().add(25, 'h'))){
        await mailUsers()
      } 
    })
  })

  // for (const household of households) {
  //   const tasks = await getMostCurrentTasks(household.id, household.recurrence)
  //   for (const task of tasks) {
  //     console.log("AAP NOOT MIES", household.id, task.id)
  //     if (moment(task.deadline).isSame(moment(), 'day')) { // bit of leeway so that it must surely work if the deadline is today
  //       console.log('check for deadline', task['user.householdId'])
  //       await deadlineComplete(task.isDone, task.id, task.userId, task['user.householdId'], household.recurrence)
  //     } else if (moment(task.deadline).isBetween(moment().add(1, 'h'), moment().add(25, 'h'))){
  //       console.log('mail the users', task['user.householdId'])
  //     } 
  //   }
  // }
});

module.exports = update