const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Types = mongoose.Types;
const Schema = mongoose.Schema;
const Activity = require('../../models/activity');
const User = require('../../models/user');

router.post('/', (req, res) => {
  const user = new User({ firebaseUid: req.body.uid });
  user
    .save()
    .then(() => res.send(''))
    .catch(error => {
      res.status(503).json(error);
    });
});

router.get('/', (req, res) => {
  User.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      console.error({ err });
      res.status(503).json(err);
    });
});

router.get('/:firebaseUid', (req, res) => {
  const firebaseUid = req.params.firebaseUid;
  User.findOne({ firebaseUid })
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.status(503).json(err);
    });
});

module.exports = router;
