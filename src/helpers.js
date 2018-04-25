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

module.exports = {getRandomInt};
