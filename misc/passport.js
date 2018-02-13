'use strict';

const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const passport = require('passport');
const bcrypt = require('bcrypt');
const FbStrategy = require('passport-facebook').Strategy;

function config () {
  passport.serializeUser((user, cb) => {
    cb(null, user._id);
  });

  passport.deserializeUser((id, cb) => {
    User.findById(id, (err, user) => {
      if (err) { return cb(err); }
      cb(null, user);
    });
  });

  passport.use(new LocalStrategy((username, password, next) => {
    User.findOne({ username }, (err, user) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return next(null, false, { message: 'Incorrect username or password' });
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return next(null, false, { message: 'Incorrect username or password' });
      }

      return next(null, user);
    });
  }));

  passport.use(new FbStrategy({
    clientID: '188206165264319',
    clientSecret: '7b2cac88a042cfe6e5d3d48a833f01ed',
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
    profileURL: 'https://graph.facebook.com/v2.5/me?fields=name,email'
  }, (accessToken, refreshToken, profile, done) => {
    User.findOne({ 'facebookId': profile.id }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (user) {
        return done(null, user);
      }

      const newUser = new User();
      newUser.facebookId = profile.id;
      newUser.name = profile.displayName;
      newUser.save((err) => {
        if (err) {
          return done(err);
        }
        done(null, newUser);
      });
    });
  }));
}

module.exports = config;
