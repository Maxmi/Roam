const express = require('express');
const router = express.Router();
const userQueries = require('../models/users');
const postQueries = require('../models/posts');

const userRoutes = require('./users');
const postRoutes = require('./posts');



//route to homepage
router.get('/', (req, res) => {
  res.render('index', {
    email: req.session.userID,
  });
});


// route to logout
router.get('/logout', (req, res, next) => {
  // if this is authenticated user - delete cookies
  if (req.session) {
    req.session = null;
    res.redirect('/');
  } else {
    return next();
  }
});


router.use('/userRoutes', userRoutes);
router.use('/postRoutes', postRoutes);

module.exports = router;
