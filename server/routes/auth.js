const express = require('express');
const router = express.Router();
const passport = require('passport');
const config = require('../config/database');
require('../config/passport')(passport);
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

router.get('/', (req, res) => {
  res.send('auth');
});

router.post('/signup', (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).send('You must provide username and password to signup');
  }

  const newUser = new User({
    username: req.body.username,
    password: req.body.password
  });

  newUser.save(err => {
    if (err) {
      return res.status(400).send('User already exists');
    }

    res.json({ error: null });
  });
});

router.post('/signin', (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).send('You must include username and password in order to sign in');
  }

  User.findOne(
    {
      username: req.body.username
    },
    (err, user) => {
      if (err) {
        throw err;
      }
      if (!user) {
        return res.status(400).send('User not found');
      }

      user.comparePassword(req.body.password, (err, isMatch) => {
        if (err || !isMatch) {
          return res.status(400).send('Password is wrong');
        }

        const token = jwt.sign(user.toJSON(), config.secret, { expiresIn: '1h' });
        res.json({ user, token: 'JWT' + token });
      });
    }
  );
});

module.exports = router;
