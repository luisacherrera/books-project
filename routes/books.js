'use strict';

const express = require('express');
const router = express.Router();
const Book = require('../models/books.js');

function checkRoles (role) {
  return function (req, res, next) {
    if (req.isAuthenticated() && req.user.role === role) {
      return next();
    } else {
      res.redirect('/auth/login');
    }
  };
}

router.get('/', (req, res, next) => {
  Book.find()
    .then(booksData => {
      res.render('books/books-list', {booksData});
    })
    .catch(err => {
      return next(err);
    });
});

router.get('/create', checkRoles('PUBLISHER'), (req, res, next) => {
  if (!req.user) {
    res.redirect('/auth/login');
  }
  res.render('books/create-book', {user: req.user});
});

router.get('/:id/edit', (req, res, next) => {
  if (!req.user) {
    return res.redirect('/auth/login');
  }
  const bookId = req.params.id;
  Book.findById(bookId)
    .then((result) => {
      let data = {
        id: result.id,
        title: result.title,
        author: result.author,
        description: result.description
      };
      res.render('books/edit', data);
    }).catch(err => {
      return next(err);
    });
});

router.get('/:id', (req, res, next) => {
  const bookId = req.params.id;
  if (req.user) {
    Book.findById(bookId)
      .then((result) => {
        let data = {
          id: result.id,
          title: result.title,
          author: result.author,
          description: result.description,
          owner: result.owner,
          user: req.user.id
        };
        res.render('books/book-detail', data);
      })
      .catch(err => {
        return next(err);
      });
  } else {
    Book.findById(bookId)
      .then((result) => {
        let data = {
          id: result.id,
          title: result.title,
          author: result.author,
          description: result.description,
          owner: result.owner
        };
        res.render('books/book-detail', data);
      })
      .catch(err => {
        return next(err);
      });
  }
});

router.post('/create', checkRoles('PUBLISHER'), (req, res, next) => {
  const infoBook = {
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    owner: req.user.id
  };

  const newBook = new Book(infoBook);

  newBook.save()
    .then((result) => {
      res.redirect('/books');
    })
    .catch((err) => {
      return next(err);
    });
});

router.post('/:id', (req, res, next) => {
  const bookId = req.params.id;

  const updateInfo = {
    title: req.body.title,
    author: req.body.author,
    description: req.body.description
  };

  Book.findByIdAndUpdate(bookId, updateInfo)
    .then((book) => {
      return res.redirect('/books');
    }).catch(err => {
      return next(err);
    });
});

module.exports = router;
