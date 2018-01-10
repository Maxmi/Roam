const db = require('./db');

const getCities = () => db.any(
  `SELECT city_id, city_name
  FROM cities`
);


const getCityById = cityID => db.one(
  `SELECT city_name
   FROM cities
   WHERE city_id=$1`, [cityID]
);


//may need to delete later
// const getCityInfo = city => db.one(
//   `SELECT city_name, city_info
//    FROM cities
//    WHERE city_name ilike $1`, [city]
// );

//may need to delete later
// const getCityPosts = city => db.any(
//   `SELECT posts.title, posts.content, posts.date_added, cities.city_name, users.name
//     FROM posts
//     JOIN cities
//     ON posts.city_id = cities.city_id
//     JOIN users
//     ON posts.user_id = users.user_id
//     WHERE cities.city_name ilike $1`, [city]
// );


const getCityInfoAndPosts = city => db.multi(
  `SELECT city_name, city_info
    FROM cities
    WHERE city_name ilike $1;
   SELECT posts.title, posts.content, posts.date_added, cities.city_name, users.name
     FROM posts
     JOIN cities
     ON posts.city_id = cities.city_id
     JOIN users
     ON posts.user_id = users.user_id
     WHERE cities.city_name ilike $1
     ORDER BY date_added DESC`, [city])
  .then(info => {
    return {
      city: info[0][0],
      posts: info[1]
    };
  })
  .catch(error => {
    console.error(error);
  });


module.exports = {
  getCities,
  getCityById,
  // getCityInfo,
  // getCityPosts,
  getCityInfoAndPosts
};
