// 'use strict';

const db = require('../config/database');
//const portName = require('../config/ss');

var request = require('request');
const axios = require('axios');
let NOTI_TIME;
let isCorrect;

const output = {
  test1: (req, res) => {
    res.render('pages/webcamTest');
  },
  test2: (req, res) => {
    console.log('node 2 flask test2');

    var geturl = 'http://127.0.0.1:5000/test/image';
    request.get(
      {
        url: geturl,
      },
      function (error, response, body) {
        console.log('line 17) ', JSON.parse(body));
        res.send(JSON.parse(body));
      }
    );
  },
  test3: (req, res) => {
    console.log(req.query.imgData);
  },
  test4: async (req, res) => {
    // console.log(req.body.imgData);
    let imgData = req.body.imgData;
    await axios
      .post('http://127.0.0.1:5000/upper/predict', {
        img: imgData,
        userid: req.session.userid,
      })
      .then((result) => {
        console.log(result.data['message']);
        res.send({
          isCorrect: result.data['message'],
          notiTime: NOTI_TIME,
          userid: req.session.userid,
          isLogined: req.session.isLogined,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },
  imgData: (req, res) => {
    res.send('성공!!');
  },
  home: (req, res) => {
    console.log('GET / is running...');
    res.render('pages/index', {
      isLogined: req.session.isLogined,
    });
  },
  login: (req, res) => {
    console.log('GET /login is running...');

    if (req.session.isLogined === true) {
      return res.redirect('/');
    }

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
        req.session.nickname = row[0][0].nickname;
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
      // req.session.loginData = false;
      // req.session.save((err) => {
      //   if (err) console.error('cant save session : ' + err);
      //   return req.session.save(() => {
      //     res.redirect('/');
      //   });
      // });
      console.log('logout success');
    } else {
      console.log('no information to logout');
    }
    res.redirect('/');
  },
  register: (req, res) => {
    console.log('GET /register is running...');

    if (req.session.isLogined === true) {
      return res.redirect('/');
    }

    res.render('pages/register', {
      isLogined: req.session.isLogined,
      registerResult: req.flash('registerResult'),
    });
  },
  register_post: async (req, res) => {
    console.log('POST /register is running...');

    let registerParam = [
      req.body.id,
      req.body.password,
      req.body.nickname,
      req.body.birthday,
      req.body.gender,
      req.body.height,
      req.body.weight,
    ];

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
      let sql = `insert into user(id, password, nickname, birthday, gender, height, weight) values('${registerParam[0]}', '${registerParam[1]}', '${registerParam[2]}', '${registerParam[3]}', '${registerParam[4]}', '${registerParam[5]}', '${registerParam[6]}')`;
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
  mypage: async (req, res) => {
    console.log('GET /mypage is running...');

    if (req.session.isLogined !== true) {
      return res.redirect('/login');
    }

    let conn = null;
    let row;

    let userData;
    try {
      let sql = `select * from user where user_id=${req.session.userid}`;
      conn = await db.getConnection();
      row = await conn.query(sql);
      if (row[0].length > 0) {
        console.log('load user info');
        userData = JSON.stringify(row[0][0]);
      } else {
        console.log('cant load user info from db. you might be logged out.');
        res.redirect('/login');
      }
    } catch (error) {
      console.log(error);
    }

    let logData;
    try {
      let sql = `select log.log_id, log.date, log.warning, log.isUpper, ss.ss1, ss.ss2, ss.ss3, ss.ss4 from log left outer join ss on log.log_id = ss.log_id where user_id=${req.session.userid} order by log.date asc`;
      row = await conn.query(sql);
      conn.release();
      console.log('load logs');
      row[0].reverse();
      logData = JSON.stringify(row[0]);
      console.log(row);
    } catch (error) {
      console.log(error);
    }

    res.render('pages/mypage', {
      isLogined: req.session.isLogined,
      username: req.session.loginData,
      nickname: req.session.nickname,
      userData: JSON.parse(userData),
      logData: JSON.parse(logData),
    });
  },
  mypage_post: async (req, res) => {
    console.log('POST /mypage is running...');
    console.log(req.body);

    let registerParam = [
      req.body.password,
      req.body.nickname,
      req.body.birthday,
      req.body.gender,
      req.body.height,
      req.body.weight,
    ];

    console.log(registerParam[2]);

    let conn = null;
    let row;
    try {
      let sql = `update user set password='${registerParam[0]}', nickname='${registerParam[1]}', birthday='${registerParam[2]}', gender='${registerParam[3]}', height='${registerParam[4]}', weight='${registerParam[5]}' where user_id='${req.session.userid}'`;
      conn = await db.getConnection();
      row = await conn.query(sql);
      console.log(row);
      res.redirect('/mypage');
    } catch (error) {
      console.log(error);
    }
  },
  init: (req, res) => {
    console.log('GET /init is running...');

    if (req.session.isLogined !== true) {
      return res.redirect('/login');
    }

    res.render('pages/init', {
      isLogined: req.session.isLogined,
    });
  },
  init_post: (req, res) => {
    console.log('POST /init is running...');
    const { min } = req.body;
    NOTI_TIME = min ? Number(min) : 20;

    res.redirect('/pocus');
  },
  pocus: (req, res) => {
    console.log('GET /pocus is running...');

    if (req.session.isLogined !== true) {
      return res.redirect('/login');
    }

    res.render('pages/pocus', {
      isLogined: req.session.isLogined,
      userid: req.session.userid,
      notiTime: NOTI_TIME,
      isCorrect: isCorrect,
    });
  },
};

module.exports = {
  output,
};
