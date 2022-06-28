const express = require("express");
const router = express.Router();
const fs = require("fs");

const mysql = require("mysql");
const password = fs.readFileSync(".mysql_password", "utf-8");
const { fail } = require("assert");
const { reset } = require("nodemon");

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

const getDate = (date) => {
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);

  const dateString = year + "-" + month + "-" + day;
  return dateString;
};

router.get("/", async (req, res) => {
  try {
    const account = req.query.account;
    const tempArray = [];
    const reservationArray = [];

    const res_sql = `SELECT * FROM Reservation WHERE buyer_account = '${account}'`;
    con.query(res_sql, async (res_err, res_rows, fields) => {
      if (res_err) {
        res.send({ success: fail, message: res_err });
        return;
      } else {
        for (let i = 0; i < res_rows.length; i++) {
          const product_id = res_rows[i].product_id;
          const checkin = getDate(new Date(res_rows[i].checkin));
          const checkout = getDate(new Date(res_rows[i].checkout));

          const temp = {
            product_id: product_id,
            checkin: checkin,
            checkout: checkout,
          };
          tempArray.push(temp);
        }

        for (let j = 0; j < tempArray.length; j++) {
          const product_id = tempArray[j].product_id;
          const pro_sql = `SELECT * FROM Products WHERE id = ${product_id}`;
          con.query(pro_sql, async (err, rows, fields) => {
            const data = fs.readFileSync(rows[0].product_image);
            const b64 = data.toString("base64");
            const imgFile = `data:image/jpeg;base64,${b64}`;

            const result = {
              id: product_id,
              image: imgFile,
              name: rows[0].product_name,
              checkin: tempArray[j].checkin,
              checkout: tempArray[j].checkout,
            };
            reservationArray.push(result);
            if (j === tempArray.length - 1) {
              res.send({ success: true, reservationArray: reservationArray });
            }
          });
        }
      }
    });
  } catch (err) {
    res.send({ success: fail, message: err });
    return;
  }
});

module.exports = router;
