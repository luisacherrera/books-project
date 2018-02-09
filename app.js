const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

const index = require('./routes/index');
const users = require('./routes/users');
const books = require('./routes/books');

const app = express();

// mongoose setup
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/database-name', {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE
});

// view engine setup
app.use(expressLayouts);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layout');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/books', books);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404);
  res.render('not-found');
});

// error handler
app.use((err, req, res, next) => {
  // always log the error
  console.error('ERROR', req.method, req.path, err);

  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    res.status(500);
    res.render('error');
  }
});

module.exports = app;
