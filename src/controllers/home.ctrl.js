'use strict';

// const app = require('../../app');
// const connection = app.connection;
const connection = require('../config/database');
const output = {
  home: (req, res) => {
    res.render('pages/index');
  },
  login: (req, res) => {
    res.render('pages/login');
  },
  logout: (req, res) => {
    res.render('pages/index');
  },
  register: (req, res) => {
    res.render('pages/register');
  },
  register_post: (req, res) => {
    console.log('register post!!!!!!!!!!!!!!!!!!!!!!!!!');
    const id = req.body.id;
    const password = req.body.password;
    console.log(req.body);
    let sql_insert = { id: id, password: password };
    console.log(sql_insert);
    connection.query(
      'select id from user where id=?',
      [id],
      function (err, rows) {
        if (rows.length) {
          res.json({ result: 'fail' });
        } else {
          connection.query(
            'insert into user set?',
            sql_insert,
            function (err, rows) {
              if (err) throw err;
              console.log('ok');
              res.json({ result: 'ok' });
            }
          );
        }
      }
    );
  },
  mypage: (req, res) => {
    res.render('pages/mypage');
  },
  init: (req, res) => {
    res.render('pages/init');
  },
  pocus: (req, res) => {
    res.render('pages/pocus');
  },
};

module.exports = {
  output,
};
