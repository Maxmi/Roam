const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = require('chai');
const { resetDb, clearDb } = require('../db/helpers');
const app = require('../../src/app');

chai.use(chaiHttp);


describe.only('user routes', () => {
  describe('/POST signup', () => {
    before(() => {
      return resetDb();
    });
    it('should let new user to signup if all data provided and redirect to /', () => {
      return chai.request(app)
        .post('/users/signup')
        .type('form')
        .send({
          'name': 'Ro Roamer',
          'email': 'ro@ro.com',
          'password': 'iloveroaming',
          'city': 'SomeCoolCity'
        })
        .then(res => {
          expect(res).to.have.status(200);
          expect(res).to.be.html;
          expect(res.text).to.include('<title>Roam | Home</title>');
          expect(res.redirects[0]).to.include('/')
        });
    });
    it('should display error message if any field was not filled', () => {
      return chai.request(app)
        .post('/users/signup')
        .type('form')
        .send({
          'name': '',
          'email': 'ro@ro.com',
          'password': 'iloveroaming',
          'city': ''
        })
        .then(res => {
          expect(res).to.have.status(200);
          expect(res).to.be.html;
          expect(res.text).to.include('<title>Roam | Sign Up</title>');
          expect(res.text).to.include('<p class="error">All fields are required to sign up</p>')
        });
    });
  }); //describe

  describe('/POST login', () => {
    before(() => {
      return resetDb();
    });
    it('should let registered user with correct credentials to log in and redirect to /', () => {
      return chai.request(app)
        .post('/users/login')
        .type('form')
        .send({
          'email': 'test@test.com',
          'password': 'test'
        })
        .then(res => {
          expect(res).to.have.status(200);
          expect(res).to.be.html;
          expect(res.text).to.include('<title>Roam | Home</title>');
          expect(res.redirects[0]).to.include('/');
        });
    });
    it('should display error message on the login page if user entered wrong password', () => {
      return chai.request(app)
        .post('/users/login')
        .type('form')
        .send({
          'email': 'test@test.com',
          'password': 'wrong'
        })
        .then(res => {
          expect(res).to.have.status(200);
          expect(res).to.be.html;
          expect(res.text).to.include('<title>Roam | Log In</title>');
          expect(res.text).to.include('<p class="error">Wrong email or password</p>')
        });
    });
    it('should display error message on the login page if user is not found in db ', () => {
      return chai.request(app)
        .post('/users/login')
        .type('form')
        .send({
          'email': 'fake@test.com',
          'password': 'wrong'
        })
        .then(res => {
          expect(res).to.have.status(200);
          expect(res).to.be.html;
          expect(res.text).to.include('<title>Roam | Log In</title>');
          expect(res.text).to.include('<p class="error">User not found.</p>')
        });
    });
  }); //describe post login



}); //most outer describe
