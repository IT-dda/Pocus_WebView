const mysql = require('mysql');

const db_info = {
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '1234',
  database: 'pocus',
};

const db = mysql.createConnection(db_info);
db.connect(function (err) {
  if (err) console.error('mysql connection failed : ' + err);
  else console.log('mysql connection success');
});
module.exports = db;
