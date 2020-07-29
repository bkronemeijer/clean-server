const { Router } = require("express")
const TaskSchedule = require("../models").taskSchedule
const authMiddleware = require("../auth/middleware")
const Sequelize = require('sequelize')
const moment = require('moment')
const Op = Sequelize.Op;

const router = new Router();


router.post('/', async (req, res, next) => {
  try {
    const {id, recurrence} = req.body

    if (!id) {
      return res.status(400).send({message: "Please provide an id"})  
    }

    const task = await TaskSchedule.findAll({raw: true, where: {userId: id, deadline: {[Op.between]: [moment().subtract(recurrence, 'd'), new Date()] }}})

    res.json(task)
  } catch (error) {
    console.log(error)
    res.status(400).send({message: "Something went wrong, sorry"})
  }
})

module.exports = router