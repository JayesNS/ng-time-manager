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

// Modify activity
router.put('/', (req, res) => {
  const { activity } = helpers.fetchParams(req.body, ['activity']);

  Activity.findByIdAndUpdate(activity._id, activity, { new: true })
    .then(activity => {
      res.json(activity);
    })
    .catch(error => {
      helpers.handleError(error, res, 503);
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

// Deleting activity
router.delete('/:id', (req, res) => {
  const { id } = helpers.fetchParams(req.params, ['id']);

  User.findOneAndUpdate({ activities: id }, { $pull: { activities: id } }, { new: true })
    .then(() => Activity.findByIdAndDelete(id))
    .then(activity => {
      res.json(activity);
    })
    .catch(err => helpers.handleError(err, res, 503));
});

module.exports = router;
