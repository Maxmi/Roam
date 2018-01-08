const express = require('express');
const index = express.Router();
// const userQueries = require('../models/users');
// const postQueries = require('../models/posts');

const userRoutes = require('./users');
const postRoutes = require('./posts');
const cityRoutes = require('./cities');


//route to homepage
index.get('/', (req, res) => {
  res.render('index', {
    title: 'Home',
    currentUser: req.session.userID,
    currentUserName: req.session.userName
  });
});


index.use('/users', userRoutes);
index.use('/posts', postRoutes);
index.use('/cities', cityRoutes);

module.exports = index;
