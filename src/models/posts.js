const db = require('./db');

const savePost = (content, userID, cityID) => db.one(
  `INSERT INTO posts (content, user_id, city_id)
    VALUES ($1, $2, $3)
    RETURNING *`,
  [content, userID, cityID]
);

const getPostsForCity = cityID => db.one(
  `SELECT *
    FROM posts
    WHERE city_id = $1`,
  [cityID]
);


const getPostsByUser = userID => db.one(
  `SELECT post_id, content, date_added
    FROM posts
    JOIN users
    ON posts.user_id = users.id
    WHERE user_id = $1`,
  [userID]
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
  getPostsForCity,
  getPostsByUser,
  editPost,
  deletePost,
};
