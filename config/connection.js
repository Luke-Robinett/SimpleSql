const mysql = require("mysql");

const connection = mysql.createConnection({
 host: "localhost",
 user: "luke",
 password: "bootcamp",
 database: "peer_up_db"
});

connection.connect(function (err) {
 if (err) {
  throw (err);
 }
 console.log("Connected to database");
});

module.exports = connection;
