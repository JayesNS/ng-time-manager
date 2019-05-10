'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = Schema({
  title: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    required: true
  }
});

module.exports = { Todo: mongoose.model('Todo', todoSchema), todoSchema };
