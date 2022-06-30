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

router.put("/", async (req, res) => {
  try {
    const reservation_id = req.body.reservation_id;
    const password_check = req.body.password_check;

    const sql = `UPDATE Reservation SET password_check = ${password_check} WHERE id = ${reservation_id}`;
    con.query(sql, async (err, rows, fields) => {
      if (err) {
        res.send({ success: fail, message: err });
      } else {
        res.send({ success: true });
      }
    });
  } catch (err) {
    res.send({ success: fail, message: err });
  }
});

module.exports = router;
