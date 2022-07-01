const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const con = require("./../../modules/mysql");

router.post("/", async (req, res) => {
  try {
    const product_id = req.body.product_id;
    const reservation_id = req.body.reservation_id;
    const owner_account = req.body.owner_account;
    const password = req.body.password;

    const check_sql = `SELECT * FROM Password WHERE product_id=${product_id} AND reservation_id=${reservation_id}`;
    con.query(check_sql, (err, rows, fields) => {
      if (rows[0] !== undefined) {
        res.status(200).send({ alert_message: "비밀번호를 이미 등록했습니다." });
        return;
      }
    });

    const sql = `SELECT * FROM Reservation WHERE id = ${reservation_id}`;
    con.query(sql, (err, rows, fields) => {
      if (err) {
        res.status(400).send({ message: err });
      } else {
        const real_owner_account = rows[0].owner_account.toString();
        const buyer_account = rows[0].buyer_account.toString();
        if (real_owner_account === owner_account) {
          const sql1 = `SELECT * FROM Users WHERE account = '${buyer_account}'`;
          con.query(sql1, (err, rows, fields) => {
            if (err) {
              res.status(400).send({ message: err });
            } else {
              const enc = crypto.publicEncrypt(rows[0].public_key, Buffer.from(password));
              const encstr = enc.toString("base64");

              const sql2 = `INSERT INTO Password (product_id, reservation_id, password) VALUES (?,?,?)`;
              const params = [product_id, reservation_id, encstr];
              con.query(sql2, params, (err, rows, fields) => {
                if (err) {
                  res.status(400).send({ message: err });
                } else {
                  console.log("비밀번호 등록 완료");
                  res.status(200).send({ message: "비밀번호 등록 완료" });
                }
              });
            }
          });
        } else {
          res.status(400).send({ alert_message: "집 주인이 아닙니다." });
        }
      }
    });
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

module.exports = router;
