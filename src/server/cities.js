const express = require('express');
const cities = express.Router();
const cityQueries = require('../models/cities');


//route to get city info and city posts
cities.get('/:city', (req, res) => {
  const {city} = req.params;
  cityQueries.getCityInfo(city)
    .then(info => {
      cityQueries.getCityPosts(city)
        .then(posts => {
          res.render('cityInfo', {
            posts,
            name: info.city_name,
            info: info.city_info
          });
        });
    });
});

module.exports = cities;
