'use strict';

const express = require('express');
const router = express.Router();
const Book = require('../models/books.js');

router.get('/', (req, res, next) => {
  res.render('index');
});

router.post('/search', (req, res, next) => {
  Book.find({title: req.body.title})
    .then(booksData => {
      res.render('books/books-list', {booksData});
    })
    .catch(err => {
      return next(err);
    });
});

module.exports = router;
