'use strict';

const output = {
  home: (req, res) => {
    res.render('pages/index');
  },
  login: (req, res) => {
    res.render('pages/login');
  },
  register: (req, res) => {
    res.render('pages/register');
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
