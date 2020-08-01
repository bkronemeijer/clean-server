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

router.post('/', async (req, res, next) => {
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

module.exports = router