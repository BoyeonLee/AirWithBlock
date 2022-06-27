const express = require("express");
const router = express.Router();
const fs = require("fs");

const mysql = require("mysql");
const password = fs.readFileSync(".mysql_password", "utf-8");
const { fail } = require("assert");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: password,
  database: "airwithblock_db",
});

con.connect(function (err) {
  if (err) throw err;
});

router.post("/", async (req, res) => {
  try {
    const sql =
      "INSERT INTO Reservation (product_id, reservationMapping_id, owner_account, buyer_account, checkin, checkout, reservation_day) VALUES (?,?,?,?,?,?,?)";
    const params = [
      req.body.product_id,
      req.body.reservation_id,
      req.body.owner_account,
      req.body.buyer_account,
      req.body.check_in,
      req.body.check_out,
      req.body.reservation_day,
    ];

    con.query(sql, params, (err, rows, fields) => {
      if (err) {
        res.send({ success: fail, message: err });
      } else {
        res.send({ success: true, message: "예약 완료" });
      }
    });
  } catch (err) {
    res.send({ success: fail, message: err });
  }
});

module.exports = router;
