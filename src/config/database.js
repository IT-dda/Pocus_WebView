const mysql = require('mysql');

let db_info = {
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '1234',
  database: 'pocus',
};

let db = mysql.createConnection(db_info);
db.connect();
module.exports = db;
