// 'use strict';

const db = require('../config/database');

const output = {
  home: (req, res) => {
    console.log('GET / is running...');
    console.log(req.session);
    res.render('pages/index', {
      is_logined: req.session.is_logined,
    });
  },
  login: (req, res) => {
    console.log('GET /login is running...');
    console.log(req.session);
    res.render('pages/login', {
      is_logined: req.session.is_logined,
      // login_result: req.session.login_result,
      login_result: req.flash('login_result'),
    });
  },
  login_post: (req, res) => {
    console.log('POST /login is running...');

    let login_param = [req.body.id, req.body.password];

    // req.session.login_result = 'fail';
    // req.session.save((err) => {
    //   if (err) console.error('cant save session : ' + err);
    // });

    db.query('select * from user where id=?', login_param[0], (err, row) => {
      if (err) console.error('error on finding user with id : ' + err);

      if (row.length > 0) {
        console.log('id exists');

        if (login_param[1] === row[0].password) {
          console.log('login success');
          req.session.is_logined = true;
          req.session.login_data = login_param[0];
          // req.session.login_result = 'success';
          req.session.save((err) => {
            if (err) console.error('cant save session : ' + err);
          });
          // req.session.upassword = login_param[1];
          // res.json({ message: 'success' });
          res.redirect('/');
        } else {
          console.log('wrong password');
          req.flash('login_result', 'fail');
          res.redirect('/login');
        }
      } else {
        console.log('id not exists');
        req.flash('login_result', 'fail');
        res.redirect('/login');
      }
    });
  },
  logout: (req, res) => {
    console.log('GET /logout is running...');

    // if문 안걸고 그냥 다 destroy 해도 되긴 될듯
    if (req.session.is_logined) {
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
      is_logined: req.session.is_logined,
      // register_result: req.session.register_result,
      register_result: req.flash('register_result'),
    });
  },
  register_post: (req, res) => {
    console.log('POST /register is running...');

    // req.session.register_result = 'fail';
    // req.session.save((err) => {
    //   if (err) console.error('cant save session : ' + err);
    // });

    let register_param = [req.body.id, req.body.password];
    db.query('select * from user where id=?', register_param[0], (err, row) => {
      if (err) console.error('error on select : ' + err);

      if (row.length == 0) {
        db.query(
          'insert into user(id, password) values(?,?)',
          register_param,
          (err, row) => {
            if (err) console.error('error on insert : ' + err);
          }
        );
        console.log('registration success');

        // req.session.register_result = 'success';
        // req.session.save((err) => {
        //   if (err) console.error('cant save session : ' + err);
        // });

        res.redirect('/login');
      } else {
        console.log('id already exists');
        req.flash('register_result', 'fail');
        res.redirect('/register');
      }
    });
  },
  mypage: (req, res) => {
    console.log('GET /mypage is running...');
    res.render('pages/mypage', {
      is_logined: req.session.is_logined,
    });
  },
  init: (req, res) => {
    console.log('GET /init is running...');
    res.render('pages/init', {
      is_logined: req.session.is_logined,
    });
  },
  pocus: (req, res) => {
    console.log('GET /pocus is running...');
    res.render('pages/pocus', {
      is_logined: req.session.is_logined,
    });
  },
};

module.exports = {
  output,
};
