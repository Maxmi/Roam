require('dotenv').config({path: __dirname + '/../../.env'});
const db = require('../../src/models/db');
const path = require('path');
const { expect } = require('chai');

const {
  addUser,
  getUser,
  authenticateUser,
  getUserInfoAndPosts,
  updateUser
} = require('../../src/models/users');

const {
  comparePassword
} = require('../../src/utils/helpers');

const { resetDb } = require('./helpers');

const BASIC_USER_PROPS = [
  'name',
  'email',
  'password'
];

const EXTRA_USER_PROPS = [
  'user_id',
  'name',
  'current_city',
  'date_joined',
  'img_num'
];

const POST_PROPS = [
  'post_id',
  'content',
  'date_added',
  'city_id',
  'city_name'
];

describe.only('user actions', () => {
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
            });
        });
    });
    it('creates a new user ID', () => {
      expect(newUser.user_id).to.be.a('number');
    });
    it('adds the name to the db', () => {
      expect(newUser.name).to.equal(name);
    });
    it('adds the email to the db', () => {
      expect(newUser.email).to.equal(email);
    });
    it('adds the encrypted password to the db', () => {
      return comparePassword(password, newUser.password)
        .then(result => {
          expect(result).to.be.true;
        });
    });
    it('adds the current_city to the db', () => {
      expect(newUser.current_city).to.equal(current_city);
    });
  });

  describe('get user from db by email', () => {
    let userRow;
    context('when user exists', () => {
      before(() => {
        return resetDb()
          .then(() => getUser('test@test.com'))
          .then(result => userRow = result);
      });
      BASIC_USER_PROPS.forEach(prop => {
        it(`returns an object with the ${prop} property`, () => {
          expect(userRow).to.have.property(prop);
        });
      });
    });
    context('when user doesn\'t exist', () => {
      before(() => {
        return resetDb();
      });
      it('should return null', () => {
        return getUser('nonexisting@test.com')
          .then(user => {
            expect(user).to.be.null;
          });
      });
    });
  });

  describe('get user info and posts', () => {
    let userData;
    context('when user exists and has posts', () => {
      before(() => {
        return resetDb()
          .then(() => getUserInfoAndPosts(1))
          .then(result => {
            userData = result;
          });
      });
      it('should return an object with user and posts properties', () => {
        expect(userData).to.be.a('object');
        expect(userData).to.have.property('user');
        expect(userData).to.have.property('posts');
      });

      EXTRA_USER_PROPS.forEach(prop => {
        it(`returns an object with the ${prop} property`, () => {
          expect(userData.user).to.have.property(prop);
        });
      });

      POST_PROPS.forEach(prop => {
        it(`returns an object with the ${prop} property`, () => {
          expect(userData.posts[0]).to.have.property(prop);
        });
      });
    });

    context('when user exists but has no posts', () => {
      before(() => {
        return resetDb()
          .then(() => getUserInfoAndPosts(2))
          .then(result => {
            userData = result;
          });
      });
      it('should return an object where posts property is empty', () => {
        expect(userData.posts).to.be.empty;
      });
    });

    context('when user doesn\'t exist and has no posts', () => {
      before(() => {
        return resetDb();
      });
      it('returns object with no values for user and posts', () => {
        return getUserInfoAndPosts(12345)
          .then(result => {
            expect(result.user).to.be.a('undefined');
            expect(result.posts).to.be.empty;
          });
      });
    });
  });

  describe('authenticate user', () => {
    context('when user exists and provided email/password are correct', () => {
      let returnedUser;
      before(() => {
        return resetDb()
          .then(() => authenticateUser('test@test.com', 'test'))
          .then(user => returnedUser = user);
      });
      BASIC_USER_PROPS.forEach(prop => {
        it(`returns an object with the ${prop} property`, () => {
          expect(returnedUser).to.have.property(prop);
        });
      });
    });

    context('when user exists but provided password is not correct', () => {
      before(() => {
        return resetDb();
      });
      it('should return null', () => {
        return authenticateUser('test@test.com', 'wrong')
          .then(result => {
            expect(result).to.be.null;
          });
      });
    });

    context('when user doesn\'t exist', () => {
      before(() => {
        return resetDb();
      });
      it('should return null', () => {
        return authenticateUser('fake@test.com', 'fake')
          .then(result => {
            expect(result).to.be.null;
          });
      });
    });
  });



});
