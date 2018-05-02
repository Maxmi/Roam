const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = require('chai');
const { resetDb } = require('../db/helpers');
const app = require('../../src/app');

chai.use(chaiHttp);

describe('/GET /cities/:city', () => {
  before(() => {
    return resetDb();
  });
  it('should return a city page', () => {
    return chai.request(app)
      .get('/cities/testcity')
      .then(res => {
        expect(res).to.be.html;
        expect(res).to.have.status(200);
        expect(res.text).to.include('<title>Roam | TestCity</title>');
      });
  });
});
