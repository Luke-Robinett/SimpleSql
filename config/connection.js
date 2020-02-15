const mysql = require("mysql");

const connection = mysql.createConnection({
 host: "localhost",
 user: "root",
 password: "",
 database: "test_db"
});

connection.connect(function (err) {
 if (err) {
  throw (err);
 }
 console.log("Connected to database");
});

module.exports = connection;
