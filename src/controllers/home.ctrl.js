// 'use strict';
// import { User } from '../models/User';
const db = require('../config/database');
const User = require('../models/User');

const output = {
  home: (req, res) => {
    console.log('GET / is running...');
    res.render('pages/index', {
      isLogined: req.session.isLogined,
    });
  },
  login: (req, res) => {
    console.log('GET /login is running...');
    res.render('pages/login', {
      isLogined: req.session.isLogined,
      loginResult: req.flash('loginResult'),
    });
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
    res.render('pages/register', {
      isLogined: req.session.isLogined,
      registerResult: req.flash('registerResult'),
    });
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

    let userData;

    db.query(
      'select * from user where id=?',
      req.session.loginData,
      (err, row) => {
        if (err) console.error('something went wrong..');

        if (row.length > 0) {
          console.log('load user info');
          userData = new User(row[0].user_id, row[0].id, row[0].password);
          // req.flash('userData', userData);

          // TODO: username을 id말고 닉네임 출력하는 걸로 변경
          res.render('pages/mypage', {
            isLogined: req.session.isLogined,
            username: req.session.loginData,
            userData: userData,
          });
        } else {
          console.log('cant load user info from db. you might be logged out.');
          res.redirect('/login');
        }
      }
    );
  },
  init: (req, res) => {
    console.log('GET /init is running...');
    res.render('pages/init', {
      isLogined: req.session.isLogined,
    });
  },
  pocus: (req, res) => {
    console.log('GET /pocus is running...');
    res.render('pages/pocus', {
      isLogined: req.session.isLogined,
    });
  },
};

module.exports = {
  output,
};
