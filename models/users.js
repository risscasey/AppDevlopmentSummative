const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    email: String,
    password: String
});

module.exports = mongoose.model('User', usersSchema);
