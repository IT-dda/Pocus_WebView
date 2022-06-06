// 'use strict';

const client = require('../config/database');

const output = {
  home: (req, res) => {
    console.log('메인페이지 작동');
    console.log(req.session);
    if (req.session.is_logined == true) {
      res.render('pages/index', {
        is_logined: req.session.is_logined,
        id: req.session.id,
      });
    } else {
      res.render('pages/index', {
        is_logined: false,
      });
    }
  },
  login: (req, res) => {
    res.render('pages/login', {
      is_logined: false,
    });
  },
  login_post: (req, res) => {
    const body = req.body;
    const id = body.id;
    const password = body.password;

    client.query('select * from user where id=?', [id], (err, data) => {
      // 로그인 확인
      console.log(data[0]);
      console.log(id);
      console.log(data[0].id);
      console.log(data[0].password);
      console.log(id == data[0].id);
      console.log(password == data[0].password);
      if (id == data[0].id && password == data[0].password) {
        console.log('로그인 성공');
        // 세션에 추가
        req.session.is_logined = true;
        req.session.id = data[0].id;
        req.session.password = data[0].password;
        req.session.save(function () {
          // 세션 스토어에 적용하는 작업
          res.render('pages/index', {
            // 정보전달
            id: data[0].id,
            is_logined: true,
          });
        });
      } else {
        console.log('로그인 실패');
        res.render('pages/login', { is_logined: false });
      }
    });
  },
  logout: (req, res) => {
    console.log('로그아웃 성공');
    req.session.destroy(function (err) {
      // 세션 파괴후 할 것들
      res.redirect('/');
    });
  },
  register: (req, res) => {
    res.render('pages/register', {
      is_logined: false,
    });
  },
  register_post: (req, res) => {
    console.log('회원가입 하는 중 ...');
    const body = req.body;
    const id = body.id;
    const password = body.password;

    client.query('select * from user where id=?', [id], (err, data) => {
      if (data.length == 0) {
        console.log('회원가입 성공');
        client.query('insert into user(id, password) values(?,?)', [
          id,
          password,
        ]);
        res.redirect('/login');
      } else {
        console.log('회원가입 실패');
        // res.send('<script>alert("회원가입 실패");</script>');
        res.redirect('/register');
      }
    });
  },
  mypage: (req, res) => {
    res.render('pages/mypage', {
      is_logined: true,
    });
  },
  init: (req, res) => {
    res.render('pages/init', {
      is_logined: true,
    });
  },
  pocus: (req, res) => {
    res.render('pages/pocus', {
      is_logined: true,
    });
  },
};

module.exports = {
  output,
};
