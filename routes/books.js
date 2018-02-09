const express = require('express');
const router = express.Router();
const Book = require('../models/books.js');

router.get('/', (req, res, next) => {
  res.render('books/books-list');
});

router.get('/create', (req, res, next) => {
  res.render('books/create-book');
});

router.post('/create', (req, res, next) => {
  const infoBook = {
    title: req.body.title,
    author: req.body.author,
    description: req.body.description
  };

  const newBook = new Book(infoBook);

  newBook.save((err) => {
    if (err) {
      return next(err);
    } else {
      res.redirect('/books');
    }
  });
});

module.exports = router;
