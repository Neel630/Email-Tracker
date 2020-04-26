const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmailSchema = new Schema({
  emailTo: {
    type: String,
  },
  count: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
  },
});

module.exports = Email = mongoose.model('email', EmailSchema);
