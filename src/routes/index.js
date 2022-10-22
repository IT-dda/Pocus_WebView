'use strict';

const express = require('express');
const router = express.Router();

const ctrl = require('../controllers/home.ctrl');

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
router.post('/test4', ctrl.output.test4);

module.exports = router;
