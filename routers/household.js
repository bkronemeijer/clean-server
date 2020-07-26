const authMiddleware = require("../auth/middleware");
const { Router } = require("express");
const User = require("../models/").user;
const Task = require("../models").task;
const Household = require("../models").household;

const router = new Router();

router.post('/', authMiddleware, async (req, res, next) => {
  try {
    const id = parseInt(req.body.id)

    if (!id) {
      return res.status(400).send("Please provide an id")
    }

    const household = await Household.findByPk(id, {include: [User]})

    res.json(household)
  } catch (error) {
    console.log(error)
    res.status(400).send("Something went wrong, sorry")
  }
})


module.exports = router