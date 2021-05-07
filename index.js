const express = require("express");
const householdRouter = require("./routers/household");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");
const myTaskRouter = require("./routers/myTask");
const authRouter = require("./routers/auth");
const PORT = process.env.PORT || 4000
const corsMiddleWare = require("cors");
const updateScheduleWorker = require("./workers/updateScheduleWorker")

const app = express();

const bodyParserMiddleWare = express.json();
app.use(bodyParserMiddleWare);

app.use(corsMiddleWare());

app.use("/household", householdRouter);
app.use("/user", userRouter);
app.use("/task", taskRouter);
app.use("/mytask", myTaskRouter);
app.use("/", authRouter);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
