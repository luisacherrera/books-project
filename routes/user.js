'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

// render the user page

router.get('/:id', (req, res, next) => {
  const userId = req.params.id;
  if (req.user.id !== userId) {
    res.redirect('/');
  }
  User.findById(userId)
    .populate('myBooks')
    .then((result) => {
      let data = {
        id: req.user.id,
        name: result.name,
        username: result.username,
        myBooks: result.myBooks
      };
      res.render('./user/user-detail', data);
    })
    .catch(err => {
      return next(err);
    });
});

router.post('/fav/:id', (req, res, next) => {
  const userId = req.user._id;
  if (!req.user) {
    res.redirect('/auth/login');
  }
  const bookId = req.params.id;

  User.findByIdAndUpdate(userId, { $push: { myBooks: bookId } })
    .then((book) => {
      return res.redirect('/books');
    }).catch(err => {
      return next(err);
    });
});

module.exports = router;
