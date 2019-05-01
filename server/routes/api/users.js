'use strict';

const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const helpers = require('../../helpers');

// Add new user
router.post('/', (req, res) => {
  console.log({ body: req.body });
  const { firebaseUid } = helpers.fetchParams(req.body, ['firebaseUid']);

  User.findOne({ firebaseUid })
    .then(user => {
      if (!user) {
        const newUser = new User({ firebaseUid });
        return newUser.save();
      }
      return user;
    })
    .then(user => res.json(user))
    .catch(error => {
      helpers.handleError(error, res, 503);
    });
});

// Get all users
router.get('/', (req, res) => {
  User.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      helpers.handleError(err, res, 503);
    });
});

// Get user by firebaseUid
router.get('/:firebaseUid', (req, res) => {
  const { firebaseUid } = helpers.fetchParams(req.params, ['firebaseUid']);
  User.findOne({ firebaseUid })
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      helpers.handleError(err, res, 503);
    });
});

module.exports = router;
