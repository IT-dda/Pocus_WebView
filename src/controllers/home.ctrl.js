'use strict';

const res = require('express/lib/response');
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
  login_post: (req, res) => {
    const id = req.body.id;
    const password = req.body.password;

    connection.query(
      'select * from user where id=?',
      [id],
      function (err, rows) {
        console.log(rows);
        console.log(rows[0]);

        if (rows.length) {
          if (rows[0].id === id && rows[0].password === password) {
            // success login
            req.session.uid = rows[0].id;
            req.session.upassword = rows[0].password;
            req.session.isLogined = true;
            req.session.save(function () {
              res.json({ result: 'ok' });
            });
            console.log(req.session);
          } else {
            // fail login
            res.json({ result: 'false' });
          }
        }
      }
    );
  },
  logout: (req, res) => {
    delete req.session.uid;
    delete req.session.upassword;
    delete req.session.isLogined;

    req.session.save(function () {
      console.log(req.session);
      res.redirect('/');
    });
  },
  register: (req, res) => {
    res.render('pages/register');
  },
  register_post: (req, res) => {
    const id = req.body.id;
    const password = req.body.password;
    let sql_insert = { id: id, password: password };
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
              console.log('register db ok');
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
