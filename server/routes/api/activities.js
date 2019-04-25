'use strict';

const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const Activity = require('../../models/activity');
const helpers = require('../../helpers');

// Create new activity
router.post('/', (req, res) => {
  const { activity, uid } = helpers.fetchParams(req.body, ['activity', 'uid']);

  const newActivity = new Activity(activity);
  newActivity
    .save()
    .then(activity =>
      User.findByIdAndUpdate(uid, { $push: { activities: activity } }, { upsert: true, new: true })
    )
    .then(() => {
      res.json(newActivity);
    })
    .catch(err => {
      helpers.handleError(err, res, 503);
    });
});

// Fetching activities for user
router.get('/:uid', (req, res) => {
  const { uid } = helpers.fetchParams(req.params, ['uid']);

  User.findById(uid)
    .populate('activities')
    .select('activities')
    .then(user => res.json(user.activities))
    .catch(err => helpers.handleError(err, res, 503));
});

module.exports = router;
