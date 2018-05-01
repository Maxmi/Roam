require('dotenv').config({path: __dirname + '/../../.env'});
const db = require('../../src/models/db');
const { expect } = require('chai');
const {
  savePost,
  editPost,
  deletePost
} = require('../../src/models/posts');

const { resetDb } = require('./helpers');

const countRows = () => db.one(
  'SELECT COUNT(post_id) FROM posts'
);

let postCountBefore;

const resetAndCount = () => {
  return resetDb().then(countRows).then(result => {
    postCountBefore = parseInt(result.count);
  });
};

describe('post actions', () => {

  describe('save post', () => {
    beforeEach(() => {
      return resetAndCount();
    });
    it('should save newly created post in db', () => {
      return savePost('test post', 1, 1)
        .then(() => {
          return countRows()
            .then(result => {
              expect(parseInt(result.count)).to.equal(postCountBefore + 1);
            });
        });
    });
  });

  describe('delete post', () => {
    beforeEach(() => {
      return resetAndCount();
    });
    it('should delete the post with given id', () => {
      return deletePost(1)
        .then(() => {
          return countRows()
            .then(result => {
              expect(parseInt(result.count)).to.equal(postCountBefore - 1);
            });
        });
    });
  });

  describe('update post', () => {
    beforeEach(() => {
      return resetDb();
    });
    it('should update the post with given id', () => {
      return editPost(1, 'this city is ok-ish')
        .then(updatedPost => {
          expect(updatedPost).to.be.a('object');
          expect(updatedPost.content).to.equal('this city is ok-ish');
        });
    });
  });

});
