require('dotenv').config({path: __dirname + '/../../.env'});
const db = require('../../src/models/db');
const {
  encryptPassword,
} = require('../../src/utils/helpers');


/** globals for creating stuff **/
const password = 'test';
const current_city = 'TestCity';
const country = 'Testland';

const userParams = {
  name: 'Test Tester',
  email: 'test@test.com',
  current_city,
};

const createUserQuery = `
  INSERT INTO users
    (name, email, password, current_city)
  VALUES
    ($/name/, $/email/, $/password/, $/current_city/)
  RETURNING *
`;

const createCityQuery = `
  INSERT INTO cities
    (country, city_name)
  VALUES
    ($/country/, $/current_city/)
  RETURNING *
`;

const createPostQuery = `
  INSERT INTO posts
    (content, user_id, city_id)
  VALUES
    ($/content/, $/user_id/, $/city_id/)
  RETURNING *
`;
/** end of global stuff **/


/**
 * Get all tables in the current db connection
 * @return { Promise } - Promise resolving to array of objects each representing a table. Each object has a key 'table_name'.
 */
const getTables = () => {
  return db.query(`
    SELECT table_name
    FROM  information_schema.tables
    WHERE table_schema = 'public'
  `);
};

/**
 * Truncate all tables to reset the database
 * @return { Promise } Promise whose resolution is unimportant
 */
const clearDb = () => {
  if(process.env.NODE_ENV === 'production') {
    throw new Error('Can\'t truncate production db!');
  }
  return getTables()
    .then(tables => {
      const table_queries = tables.map(table =>
        `TRUNCATE ${table.table_name} RESTART IDENTITY CASCADE`);
      return db.multi(table_queries.join(';'));
    })
    .catch(console.error);
};

/**
 * Seed the database with initial data for testing purposes
 * @return { Promise } Promise whose resolution is unimportant
 */

const seedDb = () => {
  let userID;
  //creating a user, city and post
  return encryptPassword(password)
    .then(hash => {
      userParams.password = hash;
      return db.one(createUserQuery, userParams)
        .then(user => {
          userID = user.user_id;
        });
    })
    .then(() => db.one(createCityQuery, { country, current_city }))
    .then(city => {
      const postParams = {
        content: 'this city is great!',
        user_id: userID,
        city_id: city.city_id
      };
      return db.one(createPostQuery, postParams);
    })
    .then(() => {
      //adding second city
      return db.one(createCityQuery, {country, current_city: 'noPostCity'});
    })
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
};


const addSecondUser = () => {
  const userParams = {
    name: 'Second User',
    email: 'test2@test.com',
    current_city: 'New TestCity'
  };
  return encryptPassword(password)
    .then(hash => {
      userParams.password = hash;
      return db.one(createUserQuery, userParams);
    });
};


/**
 * Truncate all tables and seed them
 * @returns { Promise } - Promise whose resolution is unimportant
 */
const resetDb = () => {
  return clearDb().then(seedDb).then(addSecondUser);
};


module.exports = {
  resetDb,
};
