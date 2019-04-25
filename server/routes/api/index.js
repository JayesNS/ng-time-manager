'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Api works like a charm');
});

router.use('/users', require('./users'));
router.use('/activities', require('./activities'));

module.exports = router;
