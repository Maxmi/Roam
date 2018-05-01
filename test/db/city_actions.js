require('dotenv').config({path: __dirname + '/../../.env'});
const { expect } = require('chai');
const {
  getCities,
  getCityById,
  getCityInfoAndPosts
} = require('../../src/models/cities');
const { resetDb } = require('./helpers');

describe('city actions', () => {
  beforeEach(() => {
    return resetDb();
  });
  describe('getCities', () => {
    it('should return list of cities from the db', () => {
      return getCities()
        .then(cities => {
          expect(cities).to.be.a('array');
          expect(cities.length).to.equal(2);
          cities.every(city => {
            expect(city).to.be.a('object');
            expect(city).to.have.property('city_id');
            expect(city).to.have.property('city_name');
          });
        });
    });
  });

  describe('getCityById', () => {
    context('when city exists in the db', () => {
      it('should return city name', () => {
        return getCityById(1)
          .then(city => {
            expect(city).to.be.a('object');
            expect(city).to.have.property('city_name');
            expect(city.city_name).to.equal('TestCity');
          });
      });
    });
    context('when city doesn\'t exist in the db', () => {
      it('should return null', () => {
        return getCityById(12345)
          .then(city => {
            expect(city).to.be.null;
          });
      });
    });
  });

  describe('getCityInfoAndPosts', () => {
    context('when city exists but there are no posts for it', () => {
      it('should return only city info without posts', () => {
        return getCityInfoAndPosts('noPostCity')
          .then(data => {
            expect(data).to.be.a('object');
            expect(data).to.have.property('city');
            expect(data.city).to.be.a('object');
            expect(data.city).to.have.property('city_name');
            expect(data.city).to.have.property('city_info');
            expect(data).to.have.property('posts');
            expect(data.posts).to.be.a('array');
            expect(data.posts.length).to.equal(0);
          });
      });
    });
    context('when city doesn\'t exist and there are no posts for it', () => {
      it('should return object with no data in it', () => {
        return getCityInfoAndPosts('nonExistingCity')
          .then(data => {
            expect(data).to.be.a('object');
            expect(data).to.have.property('city');
            expect(data.city).to.equal(undefined);
            expect(data.posts).to.be.a('array');
            expect(data.posts.length).to.equal(0);
          });
      });
    });
    context('when city exists and there are posts for it', () => {
      it('should return city info and posts', () => {
        return getCityInfoAndPosts('TestCity')
          .then(data => {
            expect(data).to.be.a('object');
            expect(data).to.have.property('city');
            expect(data.city).to.be.a('object');
            expect(data.city).to.have.property('city_name');
            expect(data.city.city_name).to.equal('TestCity');
            expect(data).to.have.property('posts');
            expect(data.posts).to.be.a('array');
            expect(data.posts.length).to.be.above(0);
            expect(data.posts[0]).to.have.property('content');
            expect(data.posts[0].content).to.equal('this city is great!');
          });
      });
    });
  });

});
