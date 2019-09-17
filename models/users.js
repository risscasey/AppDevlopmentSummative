const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: String,
  password: String,
  fullName: String,
  email: String
});

module.exports = mongoose.model('User', usersSchema);
