const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: [true, "That username is already taken"]
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: [true, "That email id already exists"],
    match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 
  "Please provide an email"]
  },
  contact: {
    type: Number,
    required: [true, "Please provide a contact no."]
  },
  balance: {
    type: Number,
    required: [true, "Please provide an initial balance"]
  },
  transactions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Transaction'
    }
  ]
});

module.exports = mongoose.model('User', UserSchema);