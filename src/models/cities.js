const db = require('./db');

const getCityInfo = city => db.one(
  `SELECT city_name, city_info
   FROM cities
   WHERE city_name ilike $1`, [city]
);

// const addCity = (city_name) => db.one(
//   `INSERT INTO cities (city_name)
//     VALUES ($1)
//     RETURNING *`,
//   [city_name],
// );
//

module.exports = {
  getCityInfo,
  // addCity,
};
