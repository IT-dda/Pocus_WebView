'use strict';

// 모듈
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

let db_info = {
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '1234',
  database: 'pocus',
};
let sessionStore = new MySQLStore(db_info);

app.use(
  session({
    secret: 'my key',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
  })
);

// 라우팅
const home = require('./src/routes');

// 앱 세팅
app.set('views', './src/views');
app.set('view engine', 'ejs');

// use: 미들웨어 등록 메서드
app.use(express.static(`${__dirname}/src/static`)); // __dirname: app.js 위치 반환
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // url을 통해 전달되는 데이터에 한글, 공백 등의 문자가 포함될 경우 제대로 인식되지 않는 문제 해결

app.use('/', home);

module.exports = app;
