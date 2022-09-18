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
router.get('/test', ctrl.output.test);

router.post('/register', ctrl.output.register_post);
router.post('/login', ctrl.output.login_post);
router.post('/init', ctrl.output.init_post);

module.exports = router;
