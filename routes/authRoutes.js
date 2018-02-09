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

router.get('/login', (req, res, next) => {
  res.render('auth/login', { 'message': req.flash('error') });
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/books',
  failureRedirect: '/login',
  failureFlash: true,
  passReqToCallback: true
}));

router.get('/signup', (req, res, next) => {
  res.render('auth/signup');
});

router.post('/signup', (req, res, next) => {
  if (req.session.currentUser) {
    return res.redirect('/');
  }

  const username = req.body.username;
  const password = req.body.password;

  // validate
  if (username === '' || password === '') {
    const data = {
      title: 'Signup',
      message: 'Try again'
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
      username,
      password: hashPass

    });

    newUser.save((err) => {
      if (err) {
        return next(err);
      }
      req.session.currentUser = newUser;
      res.redirect('/login');
    });
  });
});

router.get('/', ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render('books/books-list', { user: req.user });
});

router.get('/authRoutes/facebook', passport.authenticate('facebook'));
router.get('/authRoutes/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/books',
  failureRedirect: '/'
}));

router.post('/logout', (req, res) => {
  req.session.currentUser = null;
  res.redirect('/login');
});

module.exports = router;
