const express = require('express');
const posts = express.Router();

const postsQueries = require('../models/posts');

const postQueries = require('../models/users');


module.exports = posts;
