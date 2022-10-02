// 'use strict';

const db = require('../config/database');
var request = require('request');
const axios = require('axios');
let NOTI_TIME;

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
  test4: (req, res) => {
    // console.log(req.body.imgData);
    let imgData = req.body.imgData;
    // axios.get('http://127.0.0.1:5000/conn/image').then((result) => {
    //   console.log(result.data);
    // });

    axios
      .post('http://127.0.0.1:5000/conn/image', {
        values: imgData,
      })
      .then((result) => {
        // console.log(result.data['prediction'], result.data['params']);
        console.log(result.data['message']);
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
    res.render('pages/mypage', {
      isLogined: req.session.isLogined,
      username: req.session.loginData,
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
