'use strict';

const express = require('express');
const router = express.Router();
const Book = require('../models/book.js');

// render the main page
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/map', (req, res, next) => {
  res.render('map');
});

// handle the post for search
router.post('/search', (req, res, next) => {
  const bodyTitle = req.body.title;
  Book.find({archived: false, title: { '$regex': bodyTitle, '$options': 'i' }})
    .then(booksData => {
      if (booksData.length > 0) {
        res.render('books/books-list', {booksData});
      } else {
        res.render('books/book-not-found');
      }
    });
});

module.exports = router;
