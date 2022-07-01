const express = require("express");
const router = express.Router();
const fs = require("fs");
const con = require("./../../modules/mysql");

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
    const reserveStatusArray = [];

    const res_sql = `SELECT * FROM Reservation WHERE owner_account = '${account}'`;
    con.query(res_sql, async (res_err, res_rows, fields) => {
      if (res_err) {
        res.status(400).send({ message: res_err });
        return;
      } else {
        for (let i = 0; i < res_rows.length; i++) {
          const reservation_id = res_rows[i].id;
          const product_id = res_rows[i].product_id;
          const checkin = getDate(new Date(res_rows[i].checkin));
          const checkout = getDate(new Date(res_rows[i].checkout));
          const reservation_day = res_rows[i].reservation_day;

          const temp = {
            reservation_id: reservation_id,
            product_id: product_id,
            checkin: checkin,
            checkout: checkout,
            reservation_day: reservation_day,
          };
          tempArray.push(temp);
        }

        for (let j = 0; j < tempArray.length; j++) {
          const product_id = tempArray[j].product_id;
          const reservation_id = tempArray[j].reservation_id;

          const pro_sql = `SELECT * FROM Products WHERE id = ${product_id}`;
          con.query(pro_sql, async (err, pro_rows, fields) => {
            if (err) {
              res.status(400).send({ message: err });
            } else {
              const data = fs.readFileSync(pro_rows[0].product_image);
              const b64 = data.toString("base64");
              const imgFile = `data:image/jpeg;base64,${b64}`;

              const price = pro_rows[0].price;

              const check_sql = `SELECT * FROM Password WHERE product_id=${product_id} AND reservation_id=${reservation_id}`;
              con.query(check_sql, async (err, rows, fields) => {
                if (err) {
                  res.status(400).send({ message: err });
                } else {
                  if (rows[0] !== undefined) {
                    const result = {
                      reservation_id: tempArray[j].reservation_id,
                      product_id: product_id,
                      image: imgFile,
                      name: pro_rows[0].product_name,
                      checkin: tempArray[j].checkin,
                      checkout: tempArray[j].checkout,
                      totalPrice: tempArray[j].reservation_day * price,
                      disabled: true,
                    };
                    reserveStatusArray.push(result);
                  } else {
                    const result = {
                      reservation_id: tempArray[j].reservation_id,
                      product_id: product_id,
                      image: imgFile,
                      name: pro_rows[0].product_name,
                      checkin: tempArray[j].checkin,
                      checkout: tempArray[j].checkout,
                      totalPrice: tempArray[j].reservation_day * price,
                      disabled: false,
                    };
                    reserveStatusArray.push(result);
                  }
                  if (j === tempArray.length - 1) {
                    res.status(200).send({ reserveStatusArray: reserveStatusArray });
                  }
                }
              });
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
