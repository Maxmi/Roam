const db = require('./db');

const savePost = (title, content, userID, cityID) => db.one(
  `INSERT INTO posts (title, content, user_id, city_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *`,
  [title, content, userID, cityID]
);


const editPost = (postID, content) => db.one(
  `UPDATE posts
    SET content = $2
    WHERE post_id = $1
    RETURNING *`,
  [postID, content]
);


const deletePost = postID => db.none (
  `DELETE FROM posts
  WHERE post_id = $1`,
  [postID]
);


module.exports = {
  savePost,
  editPost,
  deletePost,
};
