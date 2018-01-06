const express = require('express');
const index = express.Router();
// const userQueries = require('../models/users');
// const postQueries = require('../models/posts');

const userRoutes = require('./users');
const postRoutes = require('./posts');


//route to homepage
index.get('/', (req, res) => {
  res.render('index', {
    userName: req.session.name,
  });
  console.log(userName);
});


index.use('/users', userRoutes);
index.use('/posts', postRoutes);

module.exports = index;
