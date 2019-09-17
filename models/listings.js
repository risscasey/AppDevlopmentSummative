const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  itemName: String,
  itemPrice: String,
  itemDescription: String,
  user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Listing', listingSchema);
