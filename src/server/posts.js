const express = require('express');
const posts = express.Router();
const postQueries = require('../models/users');


//route to fetch city info
posts.get('/cities/:cityID', (req, res) => {
  const cityID = parseInt(req.params.cityID);
  return postQueries.getPostsForCity(cityID)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch(console.error);
});


//route to fetch posts by user
posts.get('/users/:userID', (req, res) => {
  const userID = parseInt(req.params.userID);
  return postQueries.getPostsByUser(userID)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch(console.error);
});


//route to add a post
posts.post('/users/:userID', (req, res) => {
  const userID = parseInt(req.params.userID);
  const { content } = req.body;
  const { cityID } = parseInt(req.body);

  return postQueries.savePost(content, userID, cityID)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(console.error);
});



module.exports = posts;
