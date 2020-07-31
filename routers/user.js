const { Router } = require("express");
const User = require("../models/").user;
const Task = require("../models").task;
const Household = require("../models").household;
const authMiddleware = require("../auth/middleware")

const router = new Router();

router.get('/', async (req, res, next) => {
  try {
    const id = parseInt(req.body.id)

    if (!id) {
      return res.status(400).send("Please provide an id")
    }

    const household = await Household.findByPk(id)

    res.json(household)
  } catch (error) {
    console.log(error)
    res.status(400).send("Something went wrong, sorry")
  }
})

router.patch('/', async (req, res, next) => {
  try {
    const id = parseInt(req.body.id)
    const name = req.body.name

    if (!id) {
      return res.status(400).send("Please provide an id")
    }

    const userToUpdate = await User.findByPk(id)

    const updatedUser = await userToUpdate.update({name})

    res.json(updatedUser)
  } catch (error) {
    console.log(error)
    res.status(400).send("Something went wrong, sorry")
  }
})

module.exports = router