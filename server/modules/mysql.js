const mysql = require("mysql");

const host = process.env.MYSQL_HOST;
const user = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const database = process.env.MYSQL_DATABASE;

const con = mysql.createConnection({
  host: host,
  user: user,
  password: password,
  database: database,
  multipleStatements: true,
});

con.connect(function (err) {
  if (err) throw err;
});

module.exports = con;
