const mongoose = require('mongoose');

const EmailSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  count: {
    type: Number,
  },
  date: {
    type: Date,
  },
});

module.exports = EmailSchema = mongoose.model('email', EmailSchema);
