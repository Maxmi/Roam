const db = require('./db');
const { encryptPassword, comparePassword } = require('../utils/helpers');

/**
 * Function to sign up a user
 * @param { String } name     name
 * @param { String } email    email
 * @param { String } password password
 * @param { String } city     home city
 * @param { Number } img_num  Random number between 1 and 5 which will randomly select an image from images/userPics folder to assign as a user image
 * @return { Promise } Promise resolving into an object representing the row added to the users table
 */
const addUser = (name, email, password, city, img_num) => {
  return encryptPassword(password)
    .then(hash => {
      const query = `
        INSERT INTO users (name, email, password, current_city, img_num)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
      `;
      return db.one(query,[name, email, hash, city, img_num]);
    });
};

/**
 * Function to get user data by email
 * @param  { String } email email
 * @return { Promise }      Promise resolving into an object representing a user row or resolving to null if user is not in db
 */
const getUser = (email) => {
  const query = `
    SELECT user_id, name, email, password
    FROM users
    WHERE email=$1
  `;
  return db.oneOrNone(query,[email]);
};

/**
 * Function to check if email/password combo exists in db
 * @param  { String } email     - Email of a user
 * @param  { String } password  - Password of a user
 * @return { Promise }          - Promise resolving to object representing a user if email/password are correct
 * or null if user doesn't exist in db
 * or if email/password combo is incorrect
 */
const authenticateUser = (email, password) => {
  return getUser(email)
    .then(user => {
      if(user) {
        return comparePassword(password, user.password)
          .then(result => {
            return result ? user : null;
          });
      }
      return null;
    });
};

/**
 * Function to get data on user and his posts (user profile page)
 * @param  { Number } userID  - ID of a user
 * @return { Promise }        - Promise resolving into an object with properites user and posts
 */

const getUserInfoAndPosts = userID => {
  const query = `
    SELECT user_id, name, current_city, date_joined, img_num
    FROM users
    WHERE user_id=$1;
    SELECT posts.post_id, posts.content, posts.date_added, posts.city_id, cities.city_name
    FROM posts
    JOIN users
    ON posts.user_id = users.user_id
    JOIN cities
    ON posts.city_id = cities.city_id
    WHERE users.user_id =$1
  `;
  return db.multi(query,[userID])
    .then((info) => {
      return {
        user: info[0][0],
        posts: info[1]
      };
    }).catch(error => {
      console.error(error);
    });
};


/**
 * Function to update user profile
 * @param  { Number } user_id ID of a user
 * @param  { String } name    String entered into name field of profile form
 * @param  { String } city    String entered into city field of profile form
 * @return { Promise }        Promise resolving into an object representing an updated user info
 */

const updateUser = (user_id, name, city) => {
  const query = `
  UPDATE users
  SET name = $2, current_city = $3
  WHERE user_id= $1
  RETURNING *
  `;
  return db.one(query,[user_id, name, city]);
};



module.exports = {
  addUser,
  getUser,
  authenticateUser,
  getUserInfoAndPosts,
  updateUser
};
