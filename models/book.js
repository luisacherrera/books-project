'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const BookSchema = new Schema({
  title: String,
  author: String,
  description: String,
  owner: String,
  archived: false,
  reviews: [{
    owner: {
      type: ObjectId,
      ref: 'User'
    },
    content: String
  }],
  picture: String
});

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;
