const db = require('./db');

const addUser = (name, email, password, city, img_num) => db.one(
  ` INSERT INTO users (name, email, password, current_city, img_num)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;`,
  [name, email, password, city, img_num]
);

const getUser = (email, password) => db.one(
  'SELECT * FROM users WHERE email=$1;', [email]
);


const getUserByID = userID => db.one(
  'SELECT * FROM users WHERE user_id=$1;', [userID]
);


const getUserPosts = userID => db.any(
  `SELECT posts.post_id, posts.content, posts.date_added, posts.city_id, cities.city_name
    FROM posts
    JOIN users
    ON posts.user_id = users.user_id
    JOIN cities
    ON posts.city_id = cities.city_id
    WHERE users.user_id = $1`,
  [userID]
);


const updateUser = (id, name, email) => db.one(
  `UPDATE users
  SET name = $1, email = $2
  WHERE id = $3
  RETURNING *`
);



module.exports = {
  addUser,
  getUser,
  getUserByID,
  getUserPosts,
  updateUser
};
