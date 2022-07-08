const mysql = require("mysql");

const host = process.env.MYSQL_HOST;
const user = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const database = process.env.MYSQL_DATABASE;

const con = mysql.createPool({
  host: host,
  user: user,
  password: password,
  database: database,
  multipleStatements: true,
});

module.exports = con;
