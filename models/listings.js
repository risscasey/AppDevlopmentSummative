const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  itemName: String,
  itemPrice: String,
  itemDescription: String
});

module.exports = mongoose.model('Listing', listingSchema);
