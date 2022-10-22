'use strict';

// 모듈
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const mysql = require('mysql');
const path = require('path');
const session = require('express-session');
// const crypto = require('crypto');
const FileStore = require('session-file-store')(session);
const cors = require('cors');
const flash = require('connect-flash');
const app = express();

// 라우팅
const home = require('./src/routes');

const hour = 3600000;

// 앱 세팅
app.set('views', './src/views');
app.set('view engine', 'ejs');
// use: 미들웨어 등록 메서드
app.use(express.static(`${__dirname}/src/static`)); // __dirname: app.js 위치 반환
app.use(
  express.json({
    limit: '50mb',
  })
);
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' })); // url을 통해 전달되는 데이터에 한글, 공백 등의 문자가 포함될 경우 제대로 인식되지 않는 문제 해결
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(
  session({
    // key: 'loginData', // TODO: .env로 이동
    secret: 'testSecret', // 데이터를 암호화 옵션, TODO: .env로 이동
    resave: false, // 요청이 왔을때 세션을 수정하지 않더라도 다시 저장소에 저장되도록
    saveUninitialized: true, // 세션이 필요하면 세션을 실행(서버에 부담을 줄이기 위해)
    cookie: { expires: new Date(Date.now() + hour) },
    store: new FileStore(), // 세션이 데이터를 저장할 곳.
  })
);
app.use(flash()); // cookie-parser와 express-session보다 뒤에 위치
app.use('/', home);

module.exports = app;
