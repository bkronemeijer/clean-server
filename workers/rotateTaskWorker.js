
const schedule = require('node-schedule');
const Sequelize = require("../models").sequelize
const User = require("../models").user
const TaskSchedule = require("../models").taskSchedule
const moment = require('moment')

const getTasksToBeScheduled = async function() {
    const [results] = await Sequelize.query(`select t.id as "taskId", ts.deadline, h.recurrence, ts."userId", h.id as "householdId" from Tasks t inner join (
        select "taskId", MAX(deadline) MaxDeadline
        from "taskSchedules"
        group by "taskId"
    ) MaxDeadlines on t.id = MaxDeadlines."taskId"
    inner join "taskSchedules" ts on MaxDeadlines."taskId" = ts."taskId" and MaxDeadlines.MaxDeadline = ts.deadline
    inner join Households h on t."householdId" = h.id
    where ts.status = 'DONE'`);

    return results;
}

const scheduleNewTask = async function(taskId, previousDeadline, recurrence, previousUserId, householdId) {
    const userIds = (await User.findAll({raw: true, attributes: ['id'], where: {householdId}, order: [['name', 'ASC'], ['createdAt', 'ASC']]})).map( x => x.id)

    const userIdIndexToBeReplaced = userIds.indexOf(previousUserId)

    const newIndex = userIdIndexToBeReplaced === userIds.length - 1 ? 0 : userIdIndexToBeReplaced + 1

    await TaskSchedule.create({deadline: moment(previousDeadline).add(recurrence, 'd'), isDone: false, proofPicture: null, taskId, userId: userIds[newIndex], status: 'OPEN'})
}

const update = schedule.scheduleJob('*/5 * * * * *', async function(){
    const tasksToBeScheduled = await getTasksToBeScheduled();

    tasksToBeScheduled.forEach(async (task) => {
        const { taskId, deadline, recurrence, userId, householdId} = task;

        await scheduleNewTask(taskId, deadline, recurrence, userId, householdId);
    })
})

module.exports = update