const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = require('chai');
const { resetDb } = require('../db/helpers');
const app = require('../../src/app');

chai.use(chaiHttp);

describe('posts routes', () => {
  beforeEach(() => {
    return resetDb();
  });
  describe('/GET /posts/newPost', () => {
    it('should return a page for submitting a post', () => {
      return chai.request(app)
        .get('/posts/newPost')
        .then(res => {
          expect(res).to.be.html;
          expect(res).to.have.status(200);
        });
    });
  });

  describe('/POST /posts/newPost', () => {
    it('should add new post', () => {
      return chai.request(app)
        .post('/posts/newPost')
        .send({
          content: 'new post',
          userID: 1,
          cityID: 1,
        })
        .then(res => {
          expect(res).to.be.html;
          expect(res).to.have.status(200);
        });
    });
  });

  describe('/PUT /posts/:postID', () => {
    it('should update the post', () => {
      return chai.request(app)
        .put('/posts/1')
        .send({content: 'updated post'})
        .then(res => {
          expect(res).to.be.json;
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('object');
          expect(res.body.content).to.equal('updated post');
        });
    });
  });

  describe('/DELETE /posts/:postID', () => {
    it('should delete the post', () => {
      return chai.request(app)
        .delete('/posts/1')
        .then(res => {
          expect(res).to.be.json;
          expect(res).to.have.status(200);
        });
    });
  });


});
