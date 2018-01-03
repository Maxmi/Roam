const db = require('./db');

const saveUserImg = user_id => db.one(
  `INSERT INTO user_images (image, user_id)
    VALUES ($1, $2)
    RETURNING *`,
  [image, user_id],
);

const getUserImg = user_id => db.one(
  `SELECT image
    FROM user_images
    WHERE user_id = $1`,
  [user_id],
);

module.exports = {
  saveUserImg,
  getUserImg,
}
