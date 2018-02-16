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
  picture: String,
  reviews: [{
    owner: {
      type: ObjectId,
      ref: 'User'
    },
    content: String
  }],
  picPath: String
});

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;
