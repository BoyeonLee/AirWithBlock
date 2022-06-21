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
            id: rows[i].id,
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

const passphrase = process.env.passphrase;

router.post("/get_keys", async (req, res) => {
  try {
    const account = req.body.account;

    const sql = `SELECT * FROM Users WHERE account = '${account}'`;
    con.query(sql, async (err, rows, fields) => {
      if (err) {
        res.send({ success: fail, message: err });
        return;
      } else {
        if (rows.length !== 0) {
          res.send({ success: true, message: "이미 등록된 계정입니다." });
          console.log("이미 등록된 계정입니다.");
          return;
        } else {
          crypto.generateKeyPair(
            "rsa",
            {
              modulusLength: 4096,
              publicKeyEncoding: {
                type: "spki",
                format: "pem",
              },
              privateKeyEncoding: {
                type: "pkcs8",
                format: "pem",
                cipher: "aes-256-cbc",
                passphrase: passphrase,
              },
            },
            (err, publicKey, privateKey) => {
              const sql = "INSERT INTO Users (account, public_key, private_key) VALUES (?,?,?)";
              const params = [account.toString(), publicKey, privateKey];
              con.query(sql, params, async (err, rows, fields) => {
                if (err) {
                  res.send({ success: fail, message: err });
                } else {
                  res.send({ success: true, message: "keys 저장 완료" });
                  console.log("keys 저장 완료");
                }
              });
            }
          );
        }
      }
    });
  } catch (err) {
    res.send({ success: fail, message: err });
  }
});

module.exports = router;
