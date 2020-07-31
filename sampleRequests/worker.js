const schedule = require('node-schedule');
const WorkerTest = require("../models").workerTest
const moment = require('moment')

// // logs something every 58 minutes past the hour
// const j = schedule.scheduleJob('58 * * * *', function(){
//   console.log('The answer to life, the universe, and everything!');
// });


// // logs something every 10 seconds past the minute
// const i = schedule.scheduleJob('10 * * * * *', async function(){
//   console.log(moment().day(7));
//   const jane = await WorkerTest.create({name: "Jane", date: moment().day(7)})
//   console.log(jane instanceof WorkerTest)
//   console.log(jane.name)
// });


// // logs something at 16:09 every monday
// const b = schedule.scheduleJob('9 16 * * 1', function(){
//   console.log('The answer to life, the universe, and everything 3!');
// });

console.log(moment("2020-07-28 14:00:00+00").isSame(moment(), 'day'))
// console.log(moment("2020-07-28 14:00:00+00").isBetween(moment().subtract(1, 'h'), moment().add(1, 'h')))
console.log(moment("2020-07-28 14:00:00+00"))
console.log(moment().subtract(1, 'h'))
console.log(moment().add(1, 'h'))