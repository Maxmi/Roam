const express = require('express');
const posts = express.Router();
const postQueries = require('../models/posts');
const cityQueries = require('../models/cities');

//route to get page for adding new post
posts.get('/newPost', (req, res) => {
  cityQueries.getCities()
    .then(cities => {
      res.render('newPost', {
        title: 'Add Review',
        message: '',
        cities
      });
    });
});


//route for sending new post
posts.post('/newPost', (req, res) => {
  const {userID} = req.session;
  const { cityID, title, content } = req.body;

  return postQueries.savePost(title, content, userID, cityID)
    .then(post => {
      res.status(200).json(post);
      console.log('new post added');
    })
    .catch(console.error);
});


//route for updating a post - done on user profile page
posts.put('/:postID', (req, res) => {
  const postID = parseInt(req.params.postID);
  const {content} = req.body;
  return postQueries.editPost(postID, content)
    .then(() => {
      res.render('users/profile');
    })
    .catch(console.error);
});


//route for deleting a post - done on user profile page
posts.delete('/:postID', (req, res) => {
  const postID = parseInt(req.params.postID);
  return postQueries.deletePost(postID)
    .then(() => {
      res.render('users/profile');
    })
    .catch(console.error);
});

module.exports = posts;
