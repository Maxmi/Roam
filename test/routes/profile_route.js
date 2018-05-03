const chai = require('chai');
const { expect } = require('chai');
const { resetDb } = require('../db/helpers');
const app = require('../../src/app');

const agent = chai.request.agent(app);

describe('/GET profile and /GET logout', () => {
  before(() => {
    return resetDb();
  });
  it('should redirect non-authenticated user to login page before letting to profile page, and should redirect to home page after logout', () => {
    // trying to access profile page w/o authentication
    return agent
      .get('/users/profile')
      .then(res => {
        expect(res).to.have.status(200);
        expect(res).to.be.html;
        expect(res.text).to.include('<title>Roam | Log In</title>');
        // got redirected to login page, now trying to log in
        return agent
          .post('/users/login')
          .type('form')
          .send({
            'email': 'test@test.com',
            'password': 'test'
          })
          .then(res => {
            // landed on Home Page after authentication
            expect(res).to.have.status(200);
            expect(res).to.be.html;
            expect(res.text).to.include('<h2 class="center">Welcome to Roam, Test Tester!</h2>');
            // now trying to access profile page
            return agent
              .get('/users/profile')
              .then(res => {
                expect(res).to.have.status(200);
                expect(res).to.be.html;
                expect(res.text).to.include('<title>Roam | Profile Page</title>');
                // logging out
                return agent
                  .get('/users/logout')
                  .then(res => {
                    expect(res).to.have.status(200);
                    expect(res).to.be.html;
                    expect(res).to.redirect;
                  });
              })
              .then(() => {
                return agent.close();
              });
          });
      });
  });
}); //describe get profile
