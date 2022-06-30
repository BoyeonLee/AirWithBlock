const express = require("express");
const router = express.Router();
const fs = require("fs");
const crypto = require("crypto");

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
    const data = JSON.parse(req.query.data);
    const account = data.account;
    const product_id = data.product_id;
    const reservation_id = data.reservation_id;

    const pass_sql = `SELECT * FROM Password WHERE product_id = ${product_id} and reservation_id=${reservation_id}`;
    con.query(pass_sql, async (pass_err, pass_rows, fields) => {
      if (pass_err) {
        res.send({ success: fail, message: pass_err });
      } else {
        if (pass_rows[0] === undefined) {
          res.send({
            success: fail,
            alert_message: "집주인이 아직 비밀번호를 등록하지 않았습니다.",
          });
        } else {
          const encrypted_password = pass_rows[0].password;

          const users_sql = `SELECT * FROM Users WHERE account = '${account}'`;
          con.query(users_sql, async (err, rows, fields) => {
            if (err) {
              res.send({ success: fail, message: err });
            } else {
              const passphrase = process.env.passphrase;
              const privateKey = rows[0].private_key;

              const key = crypto.createPrivateKey({
                key: privateKey,
                format: "pem",
                passphrase: passphrase,
              });

              const dec = crypto.privateDecrypt(key, Buffer.from(encrypted_password, "base64"));
              const password = dec.toString("utf8");

              res.send({ success: true, password: password });
            }
          });
        }
      }
    });
  } catch (err) {
    res.send({ success: fail, message: err });
  }
});

module.exports = router;
