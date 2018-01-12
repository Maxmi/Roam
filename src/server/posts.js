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
        cities
      });
    });
});


//route for sending new post
posts.post('/newPost', (req, res) => {
  const {userID} = req.session;
  const { cityID, content } = req.body;

  return postQueries.savePost(content, userID, cityID)
    .then(() => {
      return cityQueries.getCityById(cityID);
    })
    .then(data => {
      res.redirect(`/cities/${data.city_name.toLowerCase()}`);
    })
    .catch(console.error);
});


//route for updating a post - done on user profile page
posts.put('/:postID', (req, res) => {
  const postID = parseInt(req.params.postID);
  const {content} = req.body;
  return postQueries.editPost(postID, content)
    .then((post) => {
      res.json(post)
    })
    .catch(console.error);
});


//route for deleting a post - done on user profile page
posts.delete('/:postID', (req, res) => {
  const postID = parseInt(req.params.postID);
  return postQueries.deletePost(postID)
    .then(() => {
      res.render('profile');
    })
    .catch(console.error);
});

module.exports = posts;
