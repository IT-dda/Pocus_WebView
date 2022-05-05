"use strict";

const express = require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");

router.get("/", ctrl.output.home);
router.get("/login", ctrl.output.login);
router.get("/register", ctrl.output.register);
router.get("/mypage", ctrl.output.mypage);
router.get("/init", ctrl.output.init);
router.get("/pocus", ctrl.output.pocus);

module.exports = router;
