const express = require('express');
const index = express.Router();
const userQueries = require('../models/users');
const postQueries = require('../models/posts');

const userRoutes = require('./users');
const postRoutes = require('./posts');



//route to homepage
index.get('/', (req, res) => {
  res.render('index');
});


// route to logout
index.get('/logout', (req, res, next) => {
  // if this is authenticated user - delete cookies
  if (req.session) {
    req.session = null;
    res.redirect('/');
  } else {
    return next();
  }
});


index.use('/users', userRoutes);
index.use('/posts', postRoutes);

module.exports = index;
