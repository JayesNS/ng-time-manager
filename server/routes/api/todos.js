'use strict';

const express = require('express');
const router = express.Router();
const Activity = require('../../models/activity');
const helpers = require('../../helpers');
const _ = require('lodash');

router.put('/', (req, res) => {
  const { todo } = helpers.fetchParams(req.body, ['todo']);

  Activity.findOneAndUpdate(
    { 'todoList.todos._id': todo._id },
    { todoList: { todos: _.pick(todo, ['completed', 'title']) } },
    {
      new: true
    }
  ).then(todo => {
    console.log({ updated: todo.todoList.todos });
    res.json(todo);
  });
});

module.exports = router;
