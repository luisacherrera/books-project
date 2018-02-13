'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

router.get('/:id', (req, res, next) => {
  const userId = req.params.id;
  res.render('./user/user-detail');
});

module.exports = router;
