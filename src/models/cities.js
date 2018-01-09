const db = require('./db');

const getCityInfo = city => db.one(
  `SELECT city_name, city_info
   FROM cities
   WHERE city_name ilike $1`, [city]
);

const getCityPosts = city => db.any(
  `SELECT posts.title, posts.content, posts.date_added, cities.city_name, users.name
    FROM posts
    JOIN cities
    ON posts.city_id = cities.city_id
    JOIN users
    ON posts.user_id = users.user_id
    WHERE cities.city_name ilike $1`, [city]
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
  getCityPosts
  // addCity,
};
