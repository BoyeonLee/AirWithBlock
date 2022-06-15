const express = require("express");
const hostRouter = require("./Router/host");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use("/host", hostRouter);

const port = 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
