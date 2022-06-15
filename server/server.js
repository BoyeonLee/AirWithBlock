const express = require("express");
const cors = require("cors");
const hostRouter = require("./Router/host");
const mainRouter = require("./Router/main");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use("/", mainRouter);
app.use("/host", hostRouter);

const port = 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
