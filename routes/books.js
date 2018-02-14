'use strict';

const express = require('express');
const router = express.Router();
const Book = require('../models/book.js');

function checkRoles (role) {
  return function (req, res, next) {
    if (req.isAuthenticated() && req.user.role === role) {
      return next();
    } else {
      res.redirect('/auth/login');
    }
  };
}

// render the list of books page
router.get('/', (req, res, next) => {
  Book.find({'archived': false})
    .then(booksData => {
      res.render('books/books-list', {booksData});
    })
    .catch(err => {
      return next(err);
    });
});

// render the add book page
router.get('/create', checkRoles('PUBLISHER'), (req, res, next) => {
  if (!req.user) {
    res.redirect('/auth/login');
  }
  res.render('books/create-book', {user: req.user});
});

// handle the post for create
router.post('/create', checkRoles('PUBLISHER'), (req, res, next) => {
  const infoBook = {
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    owner: req.user.id,
    archived: false
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

// render the edit book page
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

// handle the post for edit
router.post('/:id', (req, res, next) => {
  const bookId = req.params.id;
  const ownerId = req._passport.session.user;
  if (!req.user || req.user.id !== ownerId) {
    res.redirect('/books');
  }
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

// render the detail book page
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
          user: req.user.id,
          archived: false
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
          owner: result.owner,
          archived: false
        };
        res.render('books/book-detail', data);
      })
      .catch(err => {
        return next(err);
      });
  }
});

// handle the post for delete
router.post('/delete/:id', (req, res, next) => {
  const bookId = req.params.id;
  const ownerId = req._passport.session.user;
  if (!req.user || req.user.id !== ownerId) {
    res.redirect('/books');
  }
  const updateInfo = {
    archived: true
  };

  Book.findByIdAndUpdate(bookId, updateInfo)
    .then((book) => {
      return res.redirect('/books');
    }).catch(err => {
      return next(err);
    });
});

module.exports = router;
