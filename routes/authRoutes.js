'use strict';

// routes/auth-routes.js
const express = require('express');
const router = express.Router();
const passport = require('passport');
const ensureLogin = require('connect-ensure-login');

// User model
const User = require('../models/user');

// Bcrypt to encrypt passwords
const bcrypt = require('bcrypt');
const bcryptSalt = 10;

// render the login page
router.get('/login', (req, res, next) => {
  if (req.user) {
    return res.redirect('/');
  }
  res.render('auth/login', {'message': req.flash('error')});
});

// handle the login post
router.post('/login', passport.authenticate('local', {
  successRedirect: '/books',
  failureRedirect: '/auth/login',
  failureFlash: true,
  passReqToCallback: true
}));

// render the signup page
router.get('/signup', (req, res, next) => {
  if (req.user) {
    return res.redirect('/');
  }

  res.render('auth/signup');
});

// handle the signup post
router.post('/signup', (req, res, next) => {
  if (req.user) {
    return res.redirect('/');
  }

  const name = req.body.name;
  const username = req.body.username;
  const password = req.body.password;
  const role = req.body.type;

  // validate
  if (username === '' || password === '' || password.length < 6 || !password.match(/[A-Z]/)) {
    const data = {
      title: 'Signup',
      message: 'Password must be at least six characters with an uppercase and a number'
    };
    return res.render('auth/signup', data);
  }

  // check if user with this username already exists
  User.findOne({ 'username': username }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (user) {
      const data = {
        title: 'Signup',
        message: 'The "' + username + '" username is taken'
      };
      return res.render('auth/signup', data);
    }
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      name,
      username,
      password: hashPass,
      role
    });

    newUser.save((err) => {
      if (err) {
        return next(err);
      }
      passport.authenticate('local')(req, res, function () {
        res.redirect('/books');
      });
    });
  });
});

// ensure user is logged
router.get('/', ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render('books/books-list', { user: req.user });
});

// facebook log in
router.get('/facebook', passport.authenticate('facebook'));
router.get('/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/books',
  failureRedirect: '/auth/login'
}));

// handle the logout post
router.post('/logout', (req, res) => {
  req.logout();
  res.redirect('/auth/login');
});

module.exports = router;
