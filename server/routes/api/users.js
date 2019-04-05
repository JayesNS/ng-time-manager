const express = require('express');
const router = express.Router();
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

module.exports = router;
