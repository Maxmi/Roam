const express = require('express');
const cities = express.Router();
const cityQueries = require('../models/cities');


//route to get city info and city posts
//change it to db multi
cities.get('/:city', (req, res) => {
  const {city} = req.params;
  cityQueries.getCityInfoAndPosts(city)
    .then(info => {
      res.render('cityInfo', {
        title: info.city.city_name,
        name: info.city.city_name,
        info: info.city.city_info,
        posts: info.posts

      });
    });

  // cityQueries.getCityInfo(city)
  //   .then(info => {
  //     cityQueries.getCityPosts(city)
  //       .then(posts => {
  //         res.render('cityInfo', {
  //           posts,
  //           title: info.city_name,
  //           name: info.city_name,
  //           info: info.city_info
  //         });
  //       });
  // });
});

module.exports = cities;
