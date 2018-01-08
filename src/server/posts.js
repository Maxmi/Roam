const express = require('express');
const posts = express.Router();
const postQueries = require('../models/posts');


//route to fetch posts by city
posts.get('/cities/:city', (req, res) => {
  const {city} = req.params;
  console.log(cityID);
  // return postQueries.getPostsByCity(cityID)
  //   .then((posts) => {
  //     res.render('cityInfo', {
  //       posts
  //     });
  //   })
  //   .catch(console.error);
});


//route to get page for adding new post
posts.get('/newPost', (req, res) => {
  res.render('newPost', {

  })
});


//route to get page for adding new post
posts.post('/newPost', (req, res) => {
  // const userID = req.session.userID;
  const { content } = req.body;
  // const { cityID } =

  return postQueries.savePost(content, userID, cityID)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(console.error);
});



module.exports = posts;
