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

router.get("/", async (req, res) => {
  try {
    const sql = "SELECT * FROM Products";
    con.query(sql, (err, rows, fields) => {
      if (err) {
        res.send({ success: fail, message: err });
      } else {
        const infoArray = [];
        for (var i = 0; i < rows.length; i++) {
          const data = fs.readFileSync(rows[i].product_image);
          const b64 = data.toString("base64");
          const imgFile = `data:image/jpeg;base64,${b64}`;

          const info = {
            image: imgFile,
            name: rows[i].product_name,
            price: rows[i].price,
          };
          infoArray.push(info);
        }
        res.send({ success: true, infoArray: infoArray });
      }
    });
  } catch (err) {
    res.send({ success: fail, message: err });
  }
});

module.exports = router;
