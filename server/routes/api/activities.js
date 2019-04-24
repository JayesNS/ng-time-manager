const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const Activity = require('../../models/activity');

router.post('/', (req, res) => {
  const activityBody = req.body.activity;
  const uid = req.body.uid;

  const activity = new Activity(activityBody);
  activity
    .save()
    .then(activity =>
      User.findByIdAndUpdate(uid, { $push: { activities: activity } }, { upsert: true, new: true })
    )
    .then(activity => {
      res.json(activity);
    })
    .catch(err => {
      console.error({ err });
      res.status(503).send(err);
    });
});

router.get('/:uid', (req, res) => {
  const uid = req.params.uid;

  User.findById(uid)
    .populate('activities')
    .select('activities')
    .then(user => res.json(user.activities))
    .catch(err => res.status(503).send(err));
});

module.exports = router;
