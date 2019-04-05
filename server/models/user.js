const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firebaseUid: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model('User', UserSchema);
