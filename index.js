const express = require("express");
const householdRouter = require("./routers/household");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");
const authRouter = require("./routers/auth");
const PORT = 4000
const corsMiddleWare = require("cors");

const app = express();

const bodyParserMiddleWare = express.json();
app.use(bodyParserMiddleWare);

app.use(corsMiddleWare());

if (process.env.DELAY) {
  app.use((req, res, next) => {
    setTimeout(() => next(), parseInt(process.env.DELAY));
  });
}

app.use("/household", householdRouter);
app.use("/user", userRouter);
app.use("/task", taskRouter);
app.use("/", authRouter);

// Listen for connections on specified port (default is port 4000)

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});