const { Router } = require("express")
const Sequelize = require('sequelize')
const moment = require('moment')
const Op = Sequelize.Op;
const User = require("../models/").user
const Task = require("../models").task
const TaskSchedule = require("../models").taskSchedule
const Household = require("../models").household
const authMiddleware = require("../auth/middleware")

const router = new Router();

router.post('/static', authMiddleware, async (req, res, next) => {
  try {
    const householdId = parseInt(req.body.householdId)

    if (!householdId) {
      return res.status(400).send({message: "Please provide an id"})
    }

    const task = await Task.findAll({where: {householdId}})

    res.json(task)
  } catch (error) {
    console.log(error)
    res.status(400).send({message: "Something went wrong, sorry"})
  }
})

router.post('/current', async (req, res, next) => {
  try {
    const householdId = parseInt(req.body.householdId)
    const recurrence = parseInt(req.body.recurrence)

    if (!householdId || !recurrence) {
      return res.status(400).send({message: "Please provide an id"})
    }

    const task = await Task.findAll({where: {householdId}, include: {model: TaskSchedule, where: {deadline: {[Op.between]: [new Date(), moment().add(recurrence, 'd')] }}, include: [User]}})

    res.json(task)
  } catch (error) {
    console.log(error)
    res.status(400).send({message: "Something went wrong, sorry"})
  }
})

router.post('/delete', authMiddleware, async (req, res, next) => {
  try {
    const taskId = parseInt(req.body.taskId)
    console.log(taskId)

    if (!taskId) {
      return res.status(400).send({message: "Please provide an id"})
    }

    const taskToDelete = await Task.findByPk(taskId)
    const deletedTask = await taskToDelete.destroy()

    res.json(deletedTask)
  } catch (error) {
    console.log(error)
    res.status(400).send({message: "Something went wrong, sorry"})
  }
})

router.post("/add", authMiddleware, async(req, res, next) => {
  try {
    const {userId, householdId, deadline, title, description} = req.body
    if (!userId || !householdId || !deadline || !title || !description ) {
      res.status(400).send({message: "Missing parameters"})
    }

    const newTask = await Task.create({title, description, householdId})
    const newTaskSchedule = await TaskSchedule.create({deadline, isDone: false, taskId: newTask.id, userId})

    res.json(newTaskSchedule)
  } catch (error) {
    console.log(error)
    res.status(400).send({message: "Something went wrong, sorry"})
  }
})

module.exports = router