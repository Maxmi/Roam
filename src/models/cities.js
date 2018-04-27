const db = require('./db');

/**
 * Function to get all cities info from db
 * @return { Promise } - Promise resolving into array of objects each representing a city with id and name properties
 */
const getCities = () => {
  const query = `
    SELECT city_id, city_name
    FROM cities
    `;
  return db.any(query);
};

/**
 * Function to get city name by it's ID
 * @param  { Number } cityID - ID of a city to retrieve
 * @return { Promise }       - Promise resolving into object representing a city or resolving to null if city is not in db
 */
const getCityById = cityID => {
  const query = `
    SELECT city_name
    FROM cities
    WHERE city_id=$1
  `;
  return db.oneOrNone(query, [cityID]);
};

/**
 * Function to get data on city and posts on that city by it's name
 * @param  { String } city - String representing a city name
 * @return { Promise }     - Promise resolving into an object representing a city, with properties city and posts
 */
const getCityInfoAndPosts = city => {
  const query = `
      SELECT city_name, city_info
      FROM cities
      WHERE city_name ilike $1;
      SELECT posts.content, posts.date_added, cities.city_name, users.name
      FROM posts
      JOIN cities
      ON posts.city_id = cities.city_id
      JOIN users
      ON posts.user_id = users.user_id
      WHERE cities.city_name ilike $1
      ORDER BY date_added DESC
  `;
  return db.multi(query, [city])
    .then(info => {
      return {
        city: info[0][0],
        posts: info[1]
      };
    })
    .catch(error => {
      console.error(error);
    });
};


module.exports = {
  getCities,
  getCityById,
  getCityInfoAndPosts
};
