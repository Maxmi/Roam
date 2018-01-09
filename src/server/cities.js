const express = require('express');
const cities = express.Router();
const cityQueries = require('../models/cities');


//route to get city info
//need to change this route later - it should get cityInfo and cityPosts
//and render them together
cities.get('/:city', (req, res) => {
  const {city} = req.params;
  cityQueries.getCityInfo(city)
    .then(info => {
      cityQueries.getCityPosts(city)
        .then(posts => {
          console.log(posts)
          res.render('cityInfo', {
            posts,
            name: info.city_name,
            info: info.city_info

          });
        })


    });
});

module.exports = cities;
