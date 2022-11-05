'use strict';

const express = require('express');
const router = express.Router();

const ctrl = require('../controllers/home.ctrl');
const multer = require('multer');

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads/'); // 이미지 업로드 경로: uploads/
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
      // 업로드 파일명: [원본이름+현재날짜].확장자
    },
  }),
});

router.get('/', ctrl.output.home);
router.get('/login', ctrl.output.login);
router.get('/logout', ctrl.output.logout);
router.get('/register', ctrl.output.register);
router.get('/mypage', ctrl.output.mypage);
router.get('/init', ctrl.output.init);
router.get('/pocus', ctrl.output.pocus);
router.get('/test1', ctrl.output.test1);
router.get('/test2', ctrl.output.test2);
router.get('/test3', ctrl.output.test3);
router.get('/imgData', ctrl.output.imgData);

router.post('/register', ctrl.output.register_post);
router.post('/login', ctrl.output.login_post);
router.post('/init', ctrl.output.init_post);
router.post('/mypage', ctrl.output.mypage_post);
router.post('/test4', upload.single('imgDataForm'), ctrl.output.test4);

module.exports = router;
