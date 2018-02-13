'use strict';

const express = require('express');
const router = express.Router();
const Book = require('../models/book.js');

// render the main page
router.get('/', (req, res, next) => {
  res.render('index');
});

// handle the post for search
router.post('/search', (req, res, next) => {
  var bodyTitle = req.body.title;
  Book.find({title: { '$regex': bodyTitle, '$options': 'i' }})
    .then(booksData => {
      if (booksData.length > 0) {
        res.render('books/books-list', {booksData});
      } else {
        res.render('books/book-not-found');
      }
    });
});

module.exports = router;
