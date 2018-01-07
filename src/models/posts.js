const db = require('./db');

const savePost = (content, userID, cityID) => db.one(
  `INSERT INTO posts (content, user_id, city_id)
    VALUES ($1, $2, $3)
    RETURNING *`,
  [content, userID, cityID]
);


const getPosts = cityID => db.one(
  `SELECT *
    FROM posts
    JOIN cities
    ON posts.city_id = cities.city_id
    WHERE cities.city_id = $1`,
  [cityID]
);


const editPost = (postID, content) => db.one(
  `UPDATE posts
    SET content = $2
    WHERE post_id = $1
    RETURNING *`,
  [postID, content]
);


const deletePost = postID => db.one (
  `DELETTE FROM posts
  WHERE id = $1`,
  [postID]
);


module.exports = {
  savePost,
  getPosts,
  editPost,
  deletePost,
};
