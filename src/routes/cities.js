const express = require('express');
const cities = express.Router();
const cityQueries = require('../models/cities');
const moment = require('moment');


//route to get city info and city posts
cities.get('/:city', (req, res) => {
  const {city} = req.params;
  cityQueries.getCityInfoAndPosts(city)
    .then(info => {
      return res.render('cityInfo', {
        title: info.city.city_name,
        name: info.city.city_name,
        info: info.city.city_info,
        posts: info.posts,
        moment
      });
    });
});

module.exports = cities;
