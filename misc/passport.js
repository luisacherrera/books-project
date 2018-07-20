'use strict';

const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const passport = require('passport');
const bcrypt = require('bcrypt');
const FbStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

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

  // local login

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

  // login with google

  passport.use(new GoogleStrategy({
    clientID: '',
    clientSecret: '',
    callbackURL: 'https://bookworld.herokuapp.com/auth/google/callback'
  }, (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleID: profile.id }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (user) {
        return done(null, user);
      }

      const newUser = new User({
        googleID: profile.id,
        name: profile.displayName,
        picPath: profile.photos ? profile.photos[0].value : '/img/faces/unknown-user-pic.jpg'
      });

      newUser.save((err) => {
        if (err) {
          return done(err);
        }
        done(null, newUser);
      });
    });
  }));

  // login with facebook

  passport.use(new FbStrategy({
    clientID: '',
    clientSecret: '',
    callbackURL: 'https://bookworld.herokuapp.com/auth/facebook/callback',
    profileURL: 'https://graph.facebook.com/v2.5/me?fields=name,email',
    profileFields: ['id', 'displayName', 'name', 'gender', 'picture.type(large)']
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
      newUser.picPath = profile.photos ? profile.photos[0].value : '/img/faces/unknown-user-pic.jpg';

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
