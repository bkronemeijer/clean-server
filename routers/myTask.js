const { Router } = require("express")
const TaskSchedule = require("../models").taskSchedule
const Task = require("../models").task
const authMiddleware = require("../auth/middleware")
const Sequelize = require('sequelize')
const moment = require('moment')
const Op = Sequelize.Op;

const router = new Router();


router.post('/', async (req, res, next) => {
  try {
    const {userId, recurrence} = req.body

    if (!userId || !recurrence) {
      return res.status(400).send({message: "Please provide an id and the recurrence"})  
    }

    const task = await TaskSchedule.findAll({where: {userId, deadline: {[Op.between]: [new Date(), moment().add(recurrence, 'd')] }}, include: [Task]})

    res.json(task)
  } catch (error) {
    console.log(error)
    res.status(400).send({message: "Something went wrong, sorry"})
  }
})

module.exports = router