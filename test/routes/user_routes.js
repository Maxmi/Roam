const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = require('chai');
const { resetDb, clearDb } = require('../db/helpers');
const app = require('../../src/app');

chai.use(chaiHttp);

describe('user /GET routes for non-authenticated users', () => {
  beforeEach(() => {
    return resetDb();
  });
  it('should render a signup page', () => {
    return chai.request(app)
      .get('/users/signup')
      .then(res => {
        expect(res).to.be.html;
        expect(res).to.have.status(200);
        expect(res.text).to.include('<title>Roam | Sign Up</title');
      });
  });
  it('should render a login page', () => {
    return chai.request(app)
      .get('/users/login')
      .then(res => {
        expect(res).to.be.html;
        expect(res).to.have.status(200);
        expect(res.text).to.include('<title>Roam | Log In</title>');
      });
  });

});
