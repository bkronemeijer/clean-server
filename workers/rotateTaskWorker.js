
const moment = require('moment')

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