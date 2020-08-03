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
      return res.status(400).send({message: "Please provide an id"})
    }

    const household = await Household.findByPk(id)

    res.json(household)
  } catch (error) {
    console.log(error)
    res.status(400).send({message: "Something went wrong, sorry"})
  }
})

router.patch('/', authMiddleware, async (req, res, next) => {
  try {
    const id = parseInt(req.body.id)
    const name = req.body.name
    const wantsMail = req.body.wantsMail

    if (!id) {
      return res.status(400).send({message: "Please provide an id"})
    }

    const userToUpdate = await User.findByPk(id)

    userToUpdate.name = name
    userToUpdate.wantsMail = wantsMail

    const updatedUser = await userToUpdate.save()

    res.json(updatedUser)
  } catch (error) {
    console.log(error)
    res.status(400).send({message: "Something went wrong, sorry"})
  }
})

router.post('/delete', authMiddleware, async (req, res, next) => {
  try {
    const userId = parseInt(req.body.userId)

    if (!userId) {
      return res.status(400).send({message: "Please provide an id"})
    }

    const userToDelete = await User.findByPk(userId)
    const deletedUser = await userToDelete.update({householdId: null})

    res.json(deletedUser)
  } catch (error) {
    console.log(error)
    res.status(400).send({message: "Something went wrong, sorry"})
  }
})

module.exports = router