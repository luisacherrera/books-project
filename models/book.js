'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: String,
  author: String,
  description: String,
  owner: String,
  archived: false
});

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;
