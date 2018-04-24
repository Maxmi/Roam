require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const session = require('cookie-session');
const index = require('./server/index');
const users = require('./server/users');
const posts = require('./server/posts');

const port = process.env.PORT || 3000;
const app = express();

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// use sessions for tracking logins with cookie-session
app.use(session({
  name: 'session',
  keys: [process.env.SESSION_KEY],
}));

//make userID and userName available in templates
app.use((req, res, next) => {
  res.locals.userID = req.session.userID;
  res.locals.userName = req.session.userName;
  next();
})

// serve static files from /public
app.use(express.static('public'));

// setup views
app.set('view engine', 'pug');
app.set('views', `${__dirname}/views`);

// routes
app.use('/', index);
app.use('/users', users);
app.use('/posts', posts);

// catch 404
app.use((req, res, next) => {
  const err = new Error('File not found');
  err.status = 404;
  next();
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    title: 'Error',
    message: err.message,
    error: err,
  });
  next();
});

// listen
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

module.exports = { app };
