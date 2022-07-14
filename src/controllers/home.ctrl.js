// 'use strict';

const db = require('../config/database');

const output = {
  home: (req, res) => {
    console.log('GET / is running...');
    res.render('pages/index', {
      isLogined: req.session.isLogined,
    });
  },
  login: (req, res) => {
    console.log('GET /login is running...');

    if (req.session.isLogined) {
      console.log('You are already logged in. You cannot access to this page.');
      res.redirect('/');
    } else {
      res.render('pages/login', {
        isLogined: req.session.isLogined,
        loginResult: req.flash('loginResult'),
      });
    }
  },
  login_post: (req, res) => {
    console.log('POST /login is running...');

    let loginParam = [req.body.id, req.body.password];

    db.query('select * from user where id=?', loginParam[0], (err, row) => {
      if (err) console.error('error on finding user with id : ' + err);

      if (row.length > 0) {
        console.log('id exists');

        if (loginParam[1] === row[0].password) {
          console.log('login success');
          req.session.isLogined = true;
          req.session.loginData = loginParam[0];
          req.session.save((err) => {
            if (err) console.error('cant save session : ' + err);
            return req.session.save(() => {
              res.redirect('/');
            });
          });
        } else {
          req.session.save(() => {
            console.log('wrong password');
            req.flash('loginResult', 'fail');
            return req.session.save(() => {
              res.redirect('/login');
            });
          });
        }
      } else {
        req.session.save(() => {
          console.log('id not exists');
          req.flash('loginResult', 'fail');
          return req.session.save(() => {
            res.redirect('/login');
          });
        });
      }
    });
  },
  logout: (req, res) => {
    console.log('GET /logout is running...');

    // TODO: if문 안걸고 그냥 다 destroy 해도 되긴 될듯
    if (req.session.isLogined) {
      req.session.destroy((err) => {
        if (err) console.error('logout error : ' + err);
      });
      console.log('logout success');
    } else {
      console.log('no information to logout');
    }
    res.redirect('/');
  },
  register: (req, res) => {
    console.log('GET /register is running...');

    if (req.session.isLogined) {
      console.log('You are already logged in. You cannot access to this page.');
      res.redirect('/');
    } else {
      res.render('pages/register', {
        isLogined: req.session.isLogined,
        registerResult: req.flash('registerResult'),
      });
    }
  },
  register_post: (req, res) => {
    console.log('POST /register is running...');

    let registerParam = [req.body.id, req.body.password];

    db.query('select * from user where id=?', registerParam[0], (err, row) => {
      if (err) console.error('error on select : ' + err);

      if (row.length == 0) {
        db.query(
          'insert into user(id, password) values(?,?)',
          registerParam,
          (err, row) => {
            if (err) console.error('error on insert : ' + err);
          }
        );
        console.log('registration success');
        res.redirect('/login');
      } else {
        req.session.save(() => {
          console.log('id already exists');
          req.flash('registerResult', 'fail');
          return req.session.save(() => {
            res.redirect('/register');
          });
        });
      }
    });
  },
  mypage: (req, res) => {
    console.log('GET /mypage is running...');

    if (req.session.isLogined) {
      res.render('pages/mypage', {
        isLogined: req.session.isLogined,
        username: req.session.loginData,
      });
    } else {
      console.log('You are not logged in. You cannot access to this page.');
      res.redirect('/');
    }
  },
  init: (req, res) => {
    console.log('GET /init is running...');

    if (req.session.isLogined) {
      res.render('pages/init', {
        isLogined: req.session.isLogined,
      });
    } else {
      console.log('You are not logged in. You cannot access to this page.');
      res.redirect('/');
    }
  },
  pocus: (req, res) => {
    console.log('GET /pocus is running...');

    if (req.session.isLogined) {
      res.render('pages/pocus', {
        isLogined: req.session.isLogined,
      });
    } else {
      console.log('You are not logged in. You cannot access to this page.');
      res.redirect('/');
    }
  },
};

module.exports = {
  output,
};
