'use strict';

const express = require('express');
const router = express.Router();
const Book = require('../models/book.js');
const User = require('../models/user.js');

function checkRoles (role) {
  return function (req, res, next) {
    if (req.isAuthenticated() && req.user.role === role) {
      return next();
    } else {
      res.redirect('/auth/login');
    }
  };
}

router.post('/search', (req, res, next) => {
  const bodyType = req.body.type;
  const bodysearch = req.body.search;
  if (bodyType === 'BOOK') {
    Book.find({title: { '$regex': bodysearch, '$options': 'i' }})
      .then(booksData => {
        if (booksData.length > 0) {
          res.render('books/books-list', {booksData});
        } else {
          res.render('books/book-not-found');
        }
      });
  } else if (bodyType === 'AUTHOR') {
    Book.find({author: { '$regex': bodysearch, '$options': 'i' }})
      .then(booksData => {
        if (booksData.length > 0) {
          res.render('books/books-list', {booksData});
        } else {
          res.render('books/book-not-found');
        }
      });
  } else if (bodyType === 'PUBLISHER') {
    Book.find({owner: { '$regex': bodysearch, '$options': 'i' }})
      .then(booksData => {
        if (booksData.length > 0) {
          res.render('books/books-list', {booksData});
        } else {
          res.render('books/book-not-found');
        }
      });
  }
});
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
  const userID = req.user.id;
  const infoBook = {
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    picture: req.body.picture,
    owner: userID,
    archived: false,
    review: []
  };

  const newBook = new Book(infoBook);

  newBook.save()
    .then((result) => {
      res.redirect('/books');
    })
    .catch((err) => {
      return next(err);
    });

  const updateUser = newBook.id;

  User.findByIdAndUpdate(userID, { $push: { myBooks: updateUser } })
    .then((book) => {
      return res.redirect('/books');
    }).catch(err => {
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
  Book.findById(bookId)
    .then((result) => {
      let data = {
        owner: result.owner

      };
      const ownerId = data.owner;
      if (!req.user || req.user.id !== ownerId) {
        res.redirect('/books');
      }
      const updateBook = {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description
      };

      Book.findByIdAndUpdate(bookId, updateBook)
        .then((book) => {
          return res.redirect('/books');
        }).catch(err => {
          return next(err);
        });
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
          picture: result.picture,
          owner: result.owner,
          user: req.user,
          review: result.review,
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
          picture: result.picture,
          owner: result.owner,
          archived: false,
          review: result.review
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
  Book.findById(bookId)
    .then((result) => {
      let data = {
        owner: result.owner
      };
      const ownerId = data.owner;

      if (req._passport.session.user !== ownerId || !req.user) {
        res.redirect('/books');
      } else {
        const updateInfo = {
          archived: true
        };

        Book.findByIdAndUpdate(bookId, updateInfo)
          .then((book) => {
            return res.redirect('/books');
          }).catch(err => {
            return next(err);
          });
      }
    });
});

router.post('/review/:id', (req, res, next) => {
  const bookId = req.params.id;
  if (!req.user) {
    res.redirect('/auth/login');
  }
  const reviewData = {
    reviewOwner: req.user.name,
    reviewContent: req.body.review
  };

  Book.findByIdAndUpdate(bookId, { $push: { review: reviewData } })
    .then((book) => {
      return res.redirect('/books');
    }).catch(err => {
      return next(err);
    });
});

module.exports = router;
