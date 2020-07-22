const { Router } = require("express");
const User = require("../models/").user;
const Task = require("../models").task;
const Household = require("../models").household;

const router = new Router();

router.get('/')

module.exports = router