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
  multipleStatements: true,
});

con.connect(function (err) {
  if (err) throw err;
});

router.get("/:product_id", async (req, res) => {
  try {
    const id = req.params.product_id;
    const sql1 = `SELECT * FROM Products WHERE id = ${id}; `;
    const sql2 = `SELECT * FROM Reservation WHERE product_id = ${id}; `;

    con.query(sql1 + sql2, (err, rows, fields) => {
      if (err) {
        res.send({ success: fail, message: err });
      } else {
        const infoArray = [];

        const data = fs.readFileSync(rows[0][0].product_image);
        const b64 = data.toString("base64");
        const imgFile = `data:image/jpeg;base64,${b64}`;

        infoArray.push({ image: imgFile, info: rows[0][0], reservation: rows[1] });
        res.send({ success: true, infoArray: infoArray });
      }
    });
  } catch (e) {
    res.send({ success: fail, message: err });
  }
});

module.exports = router;
