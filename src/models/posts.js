const db = require('./db');

/**
 * Function to create and save new post in db
 * @param  { String } content Text entered by a user
 * @param  { Number } userID  ID of a logged in user, taken from session
 * @param  { Number } cityID  ID of a city a post is being created for
 * @return { Promise }        Promise resolving into object representing a post
 */
const savePost = (content, userID, cityID) => {
  const query = `
    INSERT INTO posts (content, user_id, city_id)
    VALUES ($1, $2, $3)
    RETURNING *
  `;
  return db.one(query, [content, userID, cityID]);
};

/**
 * Function to edit an existing post
 * @param  { Number } postID  ID of a post to be edited
 * @param  { String } content Edited text of the post
 * @return { Promise }        Promise resolving into object representing the updated post
 */
const editPost = (postID, content) => {
  const query = `
    UPDATE posts
    SET content = $2
    WHERE post_id = $1
    RETURNING *
  `;
  return db.one(query, [postID, content]);
};

/**
 * Function to delete a post
 * @param  { Number } postID ID of a post to be deleted
 * @return { Promise }       Promise whose resolution is unimportant
 */
const deletePost = postID => {
  const query = `
    DELETE FROM posts
    WHERE post_id = $1
  `;
  return db.none(query,[postID]);
};


module.exports = {
  savePost,
  editPost,
  deletePost,
};
