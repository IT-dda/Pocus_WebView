// const mysql = require('mysql');
const mysql = require('mysql2/promise');

const db_info = {
  host: 'localhost',
  // port: '3306',
  user: 'root',
  password: '1234',
  database: 'pocus',
  connectTimeout: 5000,
  connectionLimit: 30, //default 10
};

// const db = mysql.createConnection(db_info);
// db.connect(function (err) {
//   if (err) console.error('mysql connection failed : ' + err);
//   else console.log('mysql connection success');
// });

const db = mysql.createPool(db_info);

module.exports = db;
