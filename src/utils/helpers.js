const bcrypt = require('bcrypt');

/**
 * This function is used when a user is being added into db, to get one of images in the images/userPics folder and assign it as user's image
 * @param  { Number } min Min number in the range to get random number
 * @param  { Number } max Max number in the range
 * @return { Number }     A whole random number between min and max
 */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

/**
 * Function to encrypt user password
 * @param  { String } rawPassword String provided by a user at registration
 * @param  { Number } 10          Number representing saltRounds for hashing
 * @return { Promise }            Promise resolving to a string representing a hashed password
 */
const encryptPassword = (rawPassword)  => {
  return bcrypt.hash(rawPassword, 10);
};


/**
 * Function to compare password provided by a user and it's hash in the db
 * @param  { String } rawPassword    String provided by user at log in
 * @param  { String } hashedPassword String retrieved from db
 * @return { Promise }               Promise resolving into a boolean representing the result of comparison
 */
const comparePassword = (rawPassword, hashedPassword) => {
  return bcrypt.compare(rawPassword, hashedPassword);
};

module.exports = {
  getRandomInt,
  encryptPassword,
  comparePassword
};
