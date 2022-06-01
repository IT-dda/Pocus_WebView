const mysql = require('mysql');

let db_info = {
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '1234',
  database: 'pocus',
};

// module.exports = {
//   db_info,
//   init: function () {
//     return mysql.createConnection(db_info);
//   },
//   connect: function (connection) {
//     connection.connect(function (err) {
//       if (err) console.error('mysql connection error : ' + err);
//       else console.log('mysql is connected successfully!');
//     });
//   },
// };

let db = mysql.createConnection(db_info);
db.connect();
module.exports = db;
