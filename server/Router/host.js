const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const mysql = require("mysql");
const { fail } = require("assert");
const password = fs.readFileSync(".mysql_password", "utf-8");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: password,
  database: "airwithblock_db",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected");
});

try {
  fs.readdirSync("mainImage");
} catch (err) {
  console.error("mainImage 폴더가 없습니다. 폴더를 생성합니다.");
  fs.mkdirSync("mainImage");
}

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "mainImage/");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + "." + file.mimetype.substring(6));
  },
});

const upload = multer({ storage: imageStorage, limits: { fileSize: 20 * 1024 * 1024 } });

const getDateTime = (today) => {
  let year = today.getFullYear();
  let month = ("0" + (today.getMonth() + 1)).slice(-2);
  let day = ("0" + today.getDate()).slice(-2);
  let dateString = year + "-" + month + "-" + day;

  let hours = ("0" + today.getHours()).slice(-2);
  let minutes = ("0" + today.getMinutes()).slice(-2);
  let seconds = ("0" + today.getSeconds()).slice(-2);
  let timeString = hours + ":" + minutes + ":" + seconds;

  return dateString + " " + timeString;
};

router.post("/register", upload.single("file"), async (req, res, next) => {
  try {
    const now = new Date();

    const sql =
      "INSERT INTO Products (owner_account, product_type, product_name, product_contents, product_image, people_number, postal_code, basic_addr, detailed_addr, price, created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
    const params = [
      req.body["owner_account"],
      req.body["type"],
      req.body["name"],
      req.body["contents"],
      req.file.path,
      req.body["person"],
      req.body["postcode"],
      req.body["basic_addr"],
      req.body["detailed_addr"],
      req.body["price"],
      getDateTime(now),
    ];

    con.query(sql, params, (err, rows, fields) => {
      if (err) {
        res.send({ success: fail, message: err });
      } else {
        res.send({ success: true, message: "집 등록완료", product_id: rows.insertId });
        console.log("success");
      }
    });
  } catch (err) {
    res.send({ success: fail, message: err });
  }
});

const getDate = (date) => {
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);

  const dateString = year + "/" + month + "/" + day;
  return dateString;
};

router.get("/reservation-status", async (req, res) => {
  try {
    const account = req.query.account;

    const tempArray = [];
    const reserveStatusArray = [];

    const res_sql = `SELECT * FROM Reservation WHERE owner_account = '${account}'`;
    con.query(res_sql, async (res_err, res_rows, fields) => {
      if (res_err) {
        res.send({ success: fail, message: res_err });
        return;
      } else {
        for (let i = 0; i < res_rows.length; i++) {
          const product_id = res_rows[i].product_id;
          const checkin = getDate(new Date(res_rows[i].checkin));
          const checkout = getDate(new Date(res_rows[i].checkout));
          const reservation_day = res_rows[i].reservation_day;

          const temp = {
            product_id: product_id,
            checkin: checkin,
            checkout: checkout,
            reservation_day: reservation_day,
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

            const price = rows[0].price;

            const result = {
              id: product_id,
              image: imgFile,
              name: rows[0].product_name,
              checkin: tempArray[j].checkin,
              checkout: tempArray[j].checkout,
              totalPrice: tempArray[j].reservation_day * price,
            };
            reserveStatusArray.push(result);
            if (j === tempArray.length - 1) {
              res.send({ success: true, reserveStatusArray: reserveStatusArray });
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
