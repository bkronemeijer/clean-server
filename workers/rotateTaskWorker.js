
const schedule = require('node-schedule');
const Sequelize = require("../models").sequelize

const getTasksToBeScheduled = async function() {
    const [results] = await Sequelize.query(`select t.id, ts.deadline, h.recurrence, ts."userId", h.id as "householdId" from Tasks t inner join (
        select "taskId", MAX(deadline) MaxDeadline
        from "taskSchedules"
        group by "taskId"
    ) MaxDeadlines on t.id = MaxDeadlines."taskId"
    inner join "taskSchedules" ts on MaxDeadlines."taskId" = ts."taskId" and MaxDeadlines.MaxDeadline = ts.deadline
    inner join Households h on t."householdId" = h.id
    where ts.status = 'DONE'`);

    return results;
}

const update = schedule.scheduleJob('*/5 * * * * *', async function(){
    const tasksToBeScheduled = await getTasksToBeScheduled();

    console.log({ tasksToBeScheduled })
})

module.exports = update