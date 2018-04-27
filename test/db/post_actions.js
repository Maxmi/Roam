require('dotenv').config({path: __dirname + '/../../.env'});
const db = require('../../src/models/db');
const path = require('path');
const { expect } = require('chai');
const {
  savePost,
  editPost,
  deletePost
} = require('../../src/models/posts');
const { resetDb } = require('./helpers');

const countRows = () => db.one(
  `SELECT COUNT(post_id) FROM posts`
);

describe('post actions', () => {
  describe('save post', () => {
    beforeEach(() => {
      return resetDb();
    });

    let postCountBefore;
    it('should save newly created post in db', () => {
      return countRows()
        .then(result => {
          postCountBefore = parseInt(result.count);
        })
        .then(() => {
          return savePost('test post', 1, 1)
            .then(() => {
              return countRows()
                .then(result => {
                  expect(parseInt(result.count)).to.equal(postCountBefore + 1);
                });
            });
        });
    });
  }); //savePost

});//most outer describe
