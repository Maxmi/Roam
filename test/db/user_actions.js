require('dotenv').config({path: __dirname + '/../../.env'});
const db = require('../../src/models/db');
const path = require('path');
const { expect } = require('chai');

const {
  addUser,
  getUser,
  getUserInfoAndPosts,
  updateUser
} = require('../../src/models/users');

const {
  encryptPassword,
  comparePassword
} = require('../../src/utils/helpers');

const { resetDb } = require('./helpers');

const USER_PROPS = [
  'name',
  'email',
  'password',
  'current_city',
  'date_joined',
  'img_num'
];


describe('add a user', () => {
  let newUser;
  const name = 'Ro Roamer';
  const email = 'ro@ro.com';
  const password = 'iloveroaming';
  const current_city = 'SomeCoolCity';
  beforeEach(() => {
    return resetDb()
      .then(() => {
        return addUser(name, email, password, current_city)
          .then(user => {
            newUser = user;
            // console.log(newUser)
          });
      });
  });
  it('creates a new user', () => {
    expect(newUser.user_id).to.be.a('number');
    expect(newUser.name).to.equal(name);
    expect(newUser.email).to.equal(email);
    expect(newUser.current_city).to.equal(current_city);
  });

});
