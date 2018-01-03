const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userQueries = require('../models/users');

// route to signup page - GET
router.get('/signup', (req, res) => {
  res.render('signup', {
    title: 'Sign Up',
    error: '',
    email: req.session.userID, // setting property email on req session obj
  });
});


// route to signup page - POST
router.post('/signup', (req, res) => {
  const { name, email, password, current_city } = req.body;

  // confirm that user filled all inputs
  if (!(name || email || password || current_city)) {
    res.render('signup', {
      title: 'Sign Up',
      error: 'All fields are required to sign up',
    });
  } else {
    // hash the password and add user info to db
    bcrypt.hash(password, saltRounds, (err, hash) => {
      userQueries.addUser(email, hash)
        .then((user) => {
        // start tracking the user
          req.session.userID = user.email;
          res.redirect('/');
        }).catch((err) => {
          res.render('signup', {
            title: 'Sign Up',
            error: 'Could not add user to database',
          });
        });
    });
  }
});


// route to login page - GET
router.get('/login', (req, res) => {
  res.render('login', {
    title: 'Log In',
    error: '',
    email: req.session.userID,
  });
});


// route to login page - POST
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  // check if user filled both inputs
  if (!email || !password) {
    res.render('login', {
      title: 'Log In',
      error: 'Please provide email and password to log in',
    });
  } else {
    userQueries.getUser(email, password)
      .then((user) => {
        bcrypt.compare(password, user.password)
          .then((result) => {
            if (result) {
              req.session.userID = user.email,
              res.redirect('/');
            } else {
              res.render('login', {
                title: 'Log In',
                error: 'Wrong email or password. Please try again.',
              });
            }
          });
      }).catch((err) => {
        res.render('login', {
          title: 'Log In',
          error: 'Could not find this user in db.',
        });
      });
  }
});



module.exports = router;
