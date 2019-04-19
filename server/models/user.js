const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firebaseUid: {
    type: String,
    required: true,
    unique: true
  },
  activities: [{ type: Schema.Types.ObjectId, rel: 'Activity' }]
});

module.exports = mongoose.model('User', UserSchema);
