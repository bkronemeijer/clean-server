const schedule = require('node-schedule');
const Sequelize = require('sequelize')
const Op = Sequelize.Op;
const TaskSchedule = require("../models").taskSchedule
const User = require("../models").user
const { sequelize } = require('../models');

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

const update = schedule.scheduleJob('*/5 * * * * *', async function(){
  const tasks = (await getTasksThatHaveExceededDeadline()) || []

  tasks.forEach(async (task) => {
      await deadlineComplete(task.isDone, task.id, task.userId)
  })
})

module.exports = update