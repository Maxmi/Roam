const db = require('./db');
//sign up
const addUser = (name, email, password, city, img_num) => db.one(
  ` INSERT INTO users (name, email, password, current_city, img_num)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;`,
  [name, email, password, city, img_num]
);

//log in
const getUser = (email, password) => db.one(
  'SELECT email, password FROM users WHERE email=$1;', [email]
);

//get profile info - this function may be deleted later
const getUserByID = userID => db.one(
  'SELECT name, current_city, date_joined, img_num FROM users WHERE user_id=$1;', [userID]
);

//this function may be deleted later
const getUserPosts = userID => db.any(
  `SELECT posts.post_id, posts.title, posts.content, posts.date_added, posts.city_id, cities.city_name
    FROM posts
    JOIN users
    ON posts.user_id = users.user_id
    JOIN cities
    ON posts.city_id = cities.city_id
    WHERE users.user_id = $1`,
  [userID]
);


const getUserInfoAndPosts = userID => db.multi(
  `SELECT name, current_city, date_joined, img_num FROM users WHERE user_id=${userID};SELECT posts.post_id, posts.title, posts.content, posts.date_added, posts.city_id, cities.city_name
      FROM posts
      JOIN users
      ON posts.user_id = users.user_id
      JOIN cities
      ON posts.city_id = cities.city_id
      WHERE users.user_id = ${userID}`, userID
).then((info) => {
  return {
    user: info[0][0],
    posts: info[1]
  };
}).catch(error => {
  console.error(error);
});


const updateUser = (id, name, email, current_city) => db.one(
  `UPDATE users
  SET name = $2, email = $3
  WHERE id = $1
  RETURNING *`
);



module.exports = {
  addUser,
  getUser,
  getUserByID,
  getUserPosts,
  getUserInfoAndPosts,
  updateUser
};
