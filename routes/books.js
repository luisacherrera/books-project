const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('./books/books-list');
});

module.exports = router;
