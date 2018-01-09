const express = require('express');
const posts = express.Router();
const postQueries = require('../models/posts');


//route to get page for adding new post
posts.get('/newPost', (req, res) => {
  res.render('newPost', {
    title: 'Add Review'
  });
});


//route for sending new post
posts.post('/newPost', (req, res) => {
  const userID = req.session.userID;
  const { title } = req.body;
  const { content } = req.body;
  // const { cityID } = //how to get value from dropdown list option ?

  return postQueries.savePost(title, content, userID, cityID)
    .then(post => {
      res.status(200).json(post);
      // res.redirect('/cities/')
    })
    .catch(console.error);
});



module.exports = posts;
