const mongoose = require('mongoose');

const commentingSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  commentDescription: String
});

module.exports = mongoose.model('Comments', commentingSchema);
