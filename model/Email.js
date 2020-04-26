const mongoose = require('mongoose');

const EmailSchema = new mongoose.Schema({
  emailTo: {
    type: String,
  },
  //   password: {
  //     type: String,
  //   },
  //   emailTo: {
  //     type: String,
  //   },
  //   body: {
  //     type: String,
  //   },
  count: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
  },
});

module.exports = EmailSchema = mongoose.model('email', EmailSchema);
