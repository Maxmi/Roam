const express = require('express');
const routes = express.Router();

const userRoutes = require('./users');
const postRoutes = require('./posts');
const cityRoutes = require('./cities');


//route to homepage
routes.get('/', (req, res) => {
  res.render('index', {
    title: 'Home'
  });
});


routes.use('/users', userRoutes);
routes.use('/posts', postRoutes);
routes.use('/cities', cityRoutes);

module.exports = routes;
