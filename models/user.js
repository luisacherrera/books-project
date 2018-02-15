'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  name: String,
  role: {
    type: String,
    enum: ['USER', 'PUBLISHER'],
    default: 'USER'
  },
  myBooks: [],
  facebookId: String
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
