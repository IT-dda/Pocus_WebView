// 'use strict';

const db = require('../config/database');
const User = require('../models/User');
const Log = require('../models/Log');
const SS = require('../models/SS');
let NOTI_TIME;

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
  login_post: async (req, res) => {
    console.log('POST /login is running...');
    let loginParam = [req.body.id, req.body.password];

    let conn = null;
    let row;
    try {
      let sql = `select * from user where id='${loginParam[0]}'`;
      conn = await db.getConnection();
      row = await conn.query(sql);
      console.log(row);
      conn.release();
    } catch (error) {
      console.log(`db error : ${error}`);
    }

    if (row[0].length > 0) {
      console.log('id exists');
      if (loginParam[1] === row[0][0].password) {
        console.log('login success');
        req.session.isLogined = true;
        req.session.loginData = loginParam[0];
        req.session.userid = row[0][0].user_id;
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
  register_post: async (req, res) => {
    console.log('POST /register is running...');

    let registerParam = [req.body.id, req.body.password];

    let conn = null;
    let row;
    try {
      let sql = `select * from user where id='${registerParam[0]}'`;
      conn = await db.getConnection();
      row = await conn.query(sql);
      console.log(row);
      // conn.release();
    } catch (error) {
      console.log(`db error : ${error}`);
    }

    if (row[0].length == 0) {
      let sql = `insert into user(id, password) values('${registerParam[0]}', '${registerParam[1]}')`;
      row = await conn.query(sql);
      console.log(row);
      conn.release();
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
  },
  mypage: (req, res) => {
    console.log('GET /mypage is running...');

    let userData;
    db.query(
      'select * from user where user_id=?',
      req.session.userid,
      (err, row) => {
        if (err) console.error('something went wrong..');

        if (row.length > 0) {
          console.log('load user info');
          console.log(row);
          // userData = new User(row[0].user_id, row[0].id, row[0].password);
          userData = row[0];
        } else {
          console.log('cant load user info from db. you might be logged out.');
          res.redirect('/login');
        }
      }
    );

    let logData = [];
    db.query(
      'select * from log left outer join ss on log.log_id = ss.log_id where user_id=?',
      req.session.userid,
      (err, row) => {
        if (err) console.error('something went wrong..');

        if (row.length > 0) {
          console.log('load logs');
          console.log(row);
          for (let r in row) {
            logData.unshift(r);
          }
        } else {
          console.log('cant load log info from db. you might be logged out.');
          res.redirect('/login');
        }
      }
    );

    console.log(userData);
    console.log(logData);

    res.render('pages/mypage', {
      isLogined: req.session.isLogined,
      username: req.session.loginData,
      userData: userData,
      logData: logData,
    });
  },
  init: (req, res) => {
    console.log('GET /init is running...');
    res.render('pages/init', {
      isLogined: req.session.isLogined,
    });
  },
  init_post: (req, res) => {
    console.log('POST /init is running...');
    const { min } = req.body;
    NOTI_TIME = min;

    res.redirect('/pocus');
  },
  pocus: (req, res) => {
    console.log('GET /pocus is running...');
    res.render('pages/pocus', {
      isLogined: req.session.isLogined,
      notiTime: NOTI_TIME,
    });
  },
};

module.exports = {
  output,
};
