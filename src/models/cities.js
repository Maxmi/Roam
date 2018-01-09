const db = require('./db');

const getCities = () => db.any(
  `SELECT city_id, city_name
  FROM cities`
);

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


module.exports = {
  getCities,
  getCityInfo,
  getCityPosts
};
