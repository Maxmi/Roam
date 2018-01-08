const express = require('express');
const cities = express.Router();
const cityQueries = require('../models/cities');


//route to get city info
cities.get('/:city', (req, res) => {
  const {city} = req.params;
  // console.log(city)
  // res.send(`hi from ${city}`);
  cityQueries.getCityInfo(city)
    .then(info => {
      // console.log(info);
      res.render('cityInfo', {
        name: info.city_name,
        info: info.city_info
      })
    })

});

module.exports = cities;
