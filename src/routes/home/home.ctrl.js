"use strict";

const output = {
  home: (req, res) => {
    res.render("home/index");
  },
  login: (req, res) => {
    res.render("home/login");
  },
  register: (req, res) => {
    res.render("home/register");
  },
  mypage: (req, res) => {
    res.render("home/mypage");
  },
  init: (req, res) => {
    res.render("home/init");
  },
  pocus: (req, res) => {
    res.render("home/pocus");
  },
};

module.exports = {
  output,
};
