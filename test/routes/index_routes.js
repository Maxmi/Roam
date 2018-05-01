const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = require('chai');
const { resetDb } = require('../db/helpers');
const app = require('../../src/app');

chai.use(chaiHttp);

describe('/GET /index', () => {
  before(() => {
    return resetDb();
  });
  it('should return home page', () => {
    return chai.request(app)
      .get('/')
      .then(res => {
        expect(res).to.be.html;
        expect(res).to.have.status(200);
      });
  });
});
