'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitySchema = Schema({
  type: {
    type: String,
    enum: ['todo', 'simple'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  startingAt: {
    type: Schema.Types.Date,
    required: true
  },
  endingAt: {
    type: Schema.Types.Date,
    required: true
  }
});

module.exports = mongoose.model('Activity', activitySchema);
