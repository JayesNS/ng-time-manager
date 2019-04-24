const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
  firebaseUid: {
    type: String,
    required: true,
    unique: true
  },
  activities: [{ type: Schema.Types.ObjectId, ref: 'Activity' }]
});

module.exports = mongoose.model('User', userSchema);
