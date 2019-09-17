const mongoose = require('mongoose');

const responceSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: String,
  responceDescription: String
});

module.exports = mongoose.model('Responce', responceSchema);
