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
    .then((result) => {
      let data = {
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

module.exports = router;
