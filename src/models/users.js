const db = require('./db');
//sign up
const addUser = (name, email, password, city, img_num) => db.one(
  ` INSERT INTO users (name, email, password, current_city, img_num)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;`,
  [name, email, password, city, img_num]
);

//log in
const getUser = (email) => db.one(
  'SELECT user_id, name, password FROM users WHERE email=$1;', [email]
);


const getUserInfoAndPosts = userID => db.multi(
  `SELECT user_id, name, current_city, date_joined, img_num
      FROM users
      WHERE user_id=$1;
    SELECT posts.post_id, posts.content, posts.date_added, posts.city_id, cities.city_name
      FROM posts
      JOIN users
      ON posts.user_id = users.user_id
      JOIN cities
      ON posts.city_id = cities.city_id
      WHERE users.user_id =$1`, [userID])
  .then((info) => {
    return {
      user: info[0][0],
      posts: info[1]
    };
  }).catch(error => {
    console.error(error);
  });


const updateUser = (user_id, name, current_city) => db.one(
  `UPDATE users
  SET name = $2, current_city = $3
  WHERE user_id= $1
  RETURNING *`, [user_id, name, current_city]
);



module.exports = {
  addUser,
  getUser,
  getUserInfoAndPosts,
  updateUser
};
