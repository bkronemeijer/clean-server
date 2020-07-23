const bcrypt = require("bcrypt");
const { Router } = require("express");
const { toJWT } = require("../auth/jwt");
const User = require("../models/").user;
const Task = require("../models").task;
const Household = require("../models").household;
const saltrounds = 10

const router = new Router();

router.post('/login', async (req, res, next) => {
  try {
    const {email, password} = req.body

    if (!email || !password) {
      return res.status(400).send("Please provide email and password")
    }

    const user = await User.findOne({where: {email}})

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(400).send({
        message: "User with that email not found or password incorrect"
      });
    }

    // if (!user || password !== user.password) {
    //   return res.status(400).send({
    //     message: "User with that email not found or password incorrect"
    //   });
    // }

    delete user.dataValues["password"]; // don't send back the password hash
    const token = toJWT({ userId: user.id });
    return res.status(200).send({ token, ...user.dataValues });
  } catch (error) {
    console.log(error)
    return res.status(400).send("Something went wrong, sorry")
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const {name, email, password, newHousehold, householdName} = req.body

    if (!name || !email || !password || !newHousehold || !householdName){
      return res.status(400).send("Please provide name, email, password, action and household name")
    }

    // check if householdName exists
    const household = await Household.findOne({where: {nickName: householdName}})

    if (newHousehold === "true" && household) {
      return res.status(400).send("Household nickname already taken.")
    }

    if ( !household && newHousehold === "false") {
      return res.status(400).send("You are trying to join a household that does not exist")
    }

    // get householdId by either getting household.id or by creating an new household
    let householdId

    if (newHousehold === "true") {
      const newHousehold = await Household.create({
        nickName: householdName,
        startDate: new Date(),
        recurrence: 7
      })

      householdId = newHousehold.id
    } else {
      householdId = household.id
    }

    // add user to database, if action === newHousehold then user isAdmin = true
    const isAdmin = newHousehold === "true" ? true : false

    const newUser = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, saltrounds),
      isAdmin,
      householdId
    })

    delete newUser.dataValues["password"]; // don't send back the password hash

    const token = toJWT({ userId: newUser.id });

    res.status(201).json({ token, ...newUser.dataValues });
  } catch (error) {
    console.log(error)
    return res.status(400).send("Something went wrong, sorry")
  }
})

module.exports = router