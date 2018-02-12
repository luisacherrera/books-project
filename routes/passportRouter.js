'use strict';

const express = require('express');
const router = express.Router();
// User model
const User = require('../models/user');
// Bcrypt to encrypt passwords
const bcrypt = require('bcrypt');
const bcryptSalt = 10;
const ensureLogin = require('connect-ensure-login');
const passport = require('passport');

router.get('/', ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render('index', { user: req.user });
});

module.exports = router;
