const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: String,
  responceDescription: String
});

module.exports = mongoose.model('Comments', listingSchema);
