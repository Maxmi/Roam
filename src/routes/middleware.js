/**
 * Middleware functions to be used in routes 
 */
const requiresLogin =  (req, res, next) => {
  if(req.session && req.session.userID) {
    return next();
  } else {
    let err = new Error('You must be logged in to view this page.');
    err.status = 401;
    return next();
  }
};

const loggedOut = (req, res, next) => {
  if(req.session && req.session.userID) {
    return res.redirect('/users/profile');
  }
  return next();
};

module.exports = { requiresLogin, loggedOut };
