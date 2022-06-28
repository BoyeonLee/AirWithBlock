require("dotenv").config();
const express = require("express");
const cors = require("cors");
const hostRouter = require("./Router/host");
const mainRouter = require("./Router/main");
const detailRouter = require("./Router/detail");
const reserveRouter = require("./Router/reserve");
const myReservationRouter = require("./Router/my_reservation");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", mainRouter);
app.use("/host", hostRouter);
app.use("/detail", detailRouter);
app.use("/reserve", reserveRouter);
app.use("/my-reservation", myReservationRouter);

const port = 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
