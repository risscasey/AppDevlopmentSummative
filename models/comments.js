const mongoose = require('mongoose');

const commentsSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  commentDescription: String,
  commentID: String
});

module.exports = mongoose.model('Comments', commentsSchema);
