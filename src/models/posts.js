const db = require('./db');

const savePost = user_id => db.one(
  `INSERT INTO posts (content, user_id, city_id)
    VALUES ($1, $2, $3)
    RETURNING *`,
  [content, user_id, city_id],
);

// const getPostsForCity = city_id => db.one(
//   `SELECT *
//     FROM posts
//     WHERE city_id = $1`,
//   [city_id],
// );

const editPost = (post_id, content) => db.one(
  `UPDATE posts
    SET content = $2
    WHERE post_id = $1
    RETURNING *`,
    [post_id, content]
);

const deletePost = post_id => db.one (
  `DELETTE FROM posts
  WHERE id = $1`,
  [post_id],
);


module.exports = {
  savePost,
  // getPostsForCity,
  editPost,
  deletePost,
}
