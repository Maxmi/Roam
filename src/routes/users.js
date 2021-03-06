const express = require('express');
const users = express.Router();
const moment = require('moment');
const userQueries = require('../models/users');
const mid = require('./middleware');
const {
  getRandomInt,
} = require('../utils/helpers');


// route to signup page - GET
users.get('/signup', mid.loggedOut, (req, res) => {
  //if user not authenticated - show signup page
  if(!req.session.userName) {
    return res.render('signup', {
      title: 'Sign Up',
      error: '',
    });
  } else {
    return res.redirect('/');
  }
});


// route to signup page - POST
users.post('/signup', (req, res) => {
  const {
    name, email, password, city,
  } = req.body;

  // confirm that user filled all inputs
  if (!name || !email || !password || !city) {
    return res.render('signup', {
      title: 'Sign Up',
      error: 'All fields are required to sign up',
    });
  } else {
    const imgNum = getRandomInt(1, 5);
    return userQueries.addUser(name, email, password, city, imgNum)
      .then(user => {
        req.session.userID = user.user_id;
        req.session.userName = user.name;
        return res.redirect('/');
      })
      .catch(err => {
        return res.render('signup', {
          title: 'Sign Up',
          error: 'Could not add user to database',
        });
      });
  }
});


// route to login page - GET
users.get('/login', mid.loggedOut, (req, res) => {
  if(!req.session.userName) {
    return res.render('login', {
      title: 'Log In',
      error: '',
    });
  } else {
    return res.redirect('/');
  }
});


// route to login page - POST
users.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.render('login', {
      title: 'Log In',
      error: 'Provide both email and password.'
    });
  } else {
    return userQueries.authenticateUser(email, password)
      .then(user => {
        if(!user) {
          return res.render('login', {
            title: 'Log In',
            error: 'Wrong email or password'
          });
        } else {
          req.session.userID = user.user_id;
          req.session.userName = user.name;
          return res.redirect('/');
        }
      })
      .catch(err => {
        return res.render('login', {
          title: 'Log In',
          error: 'User not found.'
        });
      });
  }
}); //end of post route



// route to profile page - GET user info and user's posts
users.get('/profile', mid.requiresLogin, (req, res) => {
  if(!req.session.userName) {
    return res.render('login', {
      title: 'Log In',
      error: '',
    });
  } else {
    userQueries.getUserInfoAndPosts(req.session.userID)
      .then((info) => {
        req.session.userName = info.user.name;
        return res.render('profile', {
          title: 'Profile Page',
          id: info.user.user_id,
          imgNum: info.user.img_num,
          name: info.user.name,
          city: info.user.current_city,
          joined: moment(info.user.date_joined).format('MMM DD, YYYY'),
          posts: info.posts,
          moment
        });
      });
  }
});


// route to update user profile
users.put('/:userID', (req, res) => {
  const userID = parseInt(req.params.userID);
  const { newName, newCity } = req.body;
  userQueries.updateUser(userID, newName, newCity)
    .then(user => {
      return res.json(user);
    });
});


// route to logout
users.get('/logout', (req, res, next) => {
  if(req.session) {
    req.session = null;
    return res.redirect('/');
  } else {
    return next();
  }
});


module.exports = users;
