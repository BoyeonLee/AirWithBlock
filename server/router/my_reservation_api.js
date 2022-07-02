const express = require("express");
const router = express.Router();
const fs = require("fs");
const con = require("../modules/mysql");

const getDate = (date) => {
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);

  const dateString = year + "/" + month + "/" + day;
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
        res.status(400).send({ message: res_err });
        return;
      } else {
        for (let i = 0; i < res_rows.length; i++) {
          const reservation_id = res_rows[i].id;
          const product_id = res_rows[i].product_id;
          const reservationMapping_id = res_rows[i].reservationMapping_id;
          const checkin = getDate(new Date(res_rows[i].checkin));
          const checkout = getDate(new Date(res_rows[i].checkout));
          const password_check = res_rows[i].password_check;

          const temp = {
            reservation_id: reservation_id,
            product_id: product_id,
            reservationMapping_id: reservationMapping_id,
            checkin: checkin,
            checkout: checkout,
            password_check: password_check,
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
              reservation_id: tempArray[j].reservation_id,
              product_id: product_id,
              reservationMapping_id: tempArray[j].reservationMapping_id,
              image: imgFile,
              name: rows[0].product_name,
              checkin: tempArray[j].checkin,
              checkout: tempArray[j].checkout,
              password_check: tempArray[j].password_check,
            };
            reservationArray.push(result);
            if (j === tempArray.length - 1) {
              res.status(200).send({ reservationArray: reservationArray });
            }
          });
        }
      }
    });
  } catch (err) {
    res.status(400).send({ message: err });
    return;
  }
});

module.exports = router;
