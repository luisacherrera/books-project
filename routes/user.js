'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

router.get('/:id', (req, res, next) => {
  const userId = req.params.id;
  User.findById(userId)
    .then((result) => {
      let data = {
        name: result.name,
        username: result.username
      };
      res.render('./user/user-detail', data);
    })
    .catch(err => {
      return next(err);
    });
});

module.exports = router;
