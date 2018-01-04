// const db = require('./db');
//
// const addCity = (city_name) => db.one(
//   `INSERT INTO cities (city_name)
//     VALUES ($1)
//     RETURNING *`,
//   [city_name],
// );
//
// const getPostsForCity = city_id => db.one(
//   `SELECT content
//     FROM posts
//     JOIN cities
//     ON posts.city_id = cities.city_id
//     WHERE city_id = $1`,
//   [city_id],
// );
//
// module.exports = {
//   addCity,
//   getPostsForCity,
// };
