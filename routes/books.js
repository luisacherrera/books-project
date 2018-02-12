const express = require('express');
const router = express.Router();
const Book = require('../models/books.js');

router.get('/', (req, res, next) => {
  Book.find()
    .then(booksData => {
      res.render('books/books-list', {booksData});
    })
    .catch(err => {
      return next(err);
    });
});

router.get('/create', (req, res, next) => {
  res.render('books/create-book');
});

router.get('/:id/edit', (req, res, next) => {
  // if (!req.session.currentUser) {
  //   return res.redirect('/auth/login');
  // }
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

// router.post('/:id', (req, res, next) => {
//   const bookId = req.params.id;

//   const updateInfo = {
//     title: req.body.title,
//     author: req.body.author,
//     description: req.body.description
//   };

//   Celebrity.findByIdAndUpdate(celebId, updateInfo, (err, celebrity) => {
//     if (err) {
//       return next(err);
//     }
//     return res.redirect('/celebrities');
//   });
// });

router.get('/:id', (req, res, next) => {
  const bookId = req.params.id;
  Book.findById(bookId)
    .then((result) => {
      let data = {
        id: result.id,
        title: result.title,
        author: result.author,
        description: result.description
      };
      res.render('books/book-detail', data);
    })
    .catch(err => {
      return next(err);
    });
});

router.post('/create', (req, res, next) => {
  const infoBook = {
    title: req.body.title,
    author: req.body.author,
    description: req.body.description
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

module.exports = router;
