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

const getMostCurrentTasks = async() => {
  const now = moment()

  try {
    // const recentTasks = await TaskSchedule.findAll({raw: true, where: {deadline: {[Op.between]: [moment().subtract(recurrence, 'd'), new Date()] }}, include: {model: User, where: {householdId}}})
    const recentTasks = await TaskSchedule.findAll({raw: true, where: {userId: 22, deadline: {[Op.between]: [new Date(), now.add(2, 'd')] }}})            // test string
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

const naampje = async function(){        // test line -> tests every minute
  const tasks = await getMostCurrentTasks()

  console.log(tasks)

  if (tasks) {
    tasks.forEach(async (task) => {
      if (moment(task.deadline).isSame(moment(), 'day')) {
        console.log("yes 1")
        await deadlineComplete(task.isDone, task.id, task.userId, task['user.householdId'], 7)
      } else if (moment(task.deadline).isBetween(moment().add(1, 'h'), moment().add(25, 'h'))){
        console.log("yes 2")
        await mailUsers()
      } else {
        console.log("yes 3")
      }
    })
  }
}

naampje()

// const update = schedule.scheduleJob('0 22 * * *', async function(){       // use this line -> tests every day at 22h
const update = schedule.scheduleJob('0 * * * * *', naampje)

module.exports = update