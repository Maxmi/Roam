const express = require('express');
const users = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userQueries = require('../models/users');

const mid = require('./middleware');
const {getRandomInt} = require('../helpers');


// route to signup page - GET
users.get('/signup', mid.loggedOut, (req, res) => {
  //if user not authenticated - show signup page
  if(!req.session.userName) {
    res.render('signup', {
      title: 'Sign Up',
      error: '',
      name: req.session.userName, // setting property name on req session obj
    });
  } else {
    res.redirect('/users/profile');
  }

});


// route to signup page - POST
users.post('/signup', (req, res) => {
  const {
    name, email, password, city,
  } = req.body;

  // confirm that user filled all inputs
  if (!name || !email || !password || !city) {
    res.render('signup', {
      title: 'Sign Up',
      error: 'All fields are required to sign up',
    });
  } else {
    // hash the password and add user info to db
    bcrypt.hash(password, saltRounds, (err, hash) => {
      const imgNum = getRandomInt(1, 5);
      userQueries.addUser(name, email, hash, city, imgNum)
        .then((user) => {
        // start tracking the user
          req.session.userID = user.user_id;
          req.session.userName = user.name;
          res.redirect('/users/profile');
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
users.get('/login', mid.loggedOut, (req, res) => {
  if(!req.session.userName) {
    res.render('login', {
      title: 'Log In',
      error: '',
      name: req.session.userName,
    });
  } else {
    res.redirect('/users/profile');
  }

});


// route to login page - POST
users.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.render('login', {
      title: 'Log In',
      error: 'Provide both email and password.'
    });
  } else {
    userQueries.getUser(email, password)
      .then(user => {
        if(!user) {
          res.render('login', {
            title: 'Log In',
            error: 'Could not retrieve user.'
          });
        } else {
          bcrypt.compare(password, user.password)
            .then(result => {
              if(!result) {
                res.render('login', {
                  title: 'Log In',
                  error: 'Wrong email or password.'
                });
              } else {
                req.session.userID = user.user_id;
                req.session.userName = user.name;
                return res.redirect('/users/profile');
              }
            });
        }
      });
  }


}); //end of post route



// route to profile page - GET user info and user's posts
users.get('/profile', mid.requiresLogin, (req, res) => {

  userQueries.getUserByID(req.session.userID)
    .then(user => {
      userQueries.getUserPosts(req.session.userID)
        .then(posts => {
          res.render('profile', {
            posts,
            title: 'Profile Page',
            id: user.user_id,
            imgNum: user.img_num,
            name: user.name,
            city: user.current_city,
            joined: user.date_joined
          });
        });
    });
});


// route to logout
users.get('/logout', (req, res, next) => {
  if (req.session) {
    req.session = null;
    res.redirect('/');
  } else {
    return next();
  }
});

module.exports = users;
