const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const activity = req.body.activity;
  const uid = req.body.uid;

  res.json({ activity, uid });
});

module.exports = router;
