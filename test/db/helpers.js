require('dotenv').config({path: __dirname + '/../../.env'});
const db = require('../../src/models/db');
const path = require('path');

const createUserQuery = `
  INSERT INTO users
    (name, email, password, current_city)
  VALUES
    ($/name/, $/email/, $/password/, $/current_city/)
  RETURNING *
`;

const createCityQuery = `
  INSERT INTO cities
    (country, city)
  VALUE
    ($/country/, $/city/)
  RETURNING *
`;

const createPostQuery = `
  INSERT INTO posts
    (content, user_id, city_id)
  VALUES
    ($/content/, $/user_id/, $/city_id/)
  RETURNING *
`;

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



module.exports = {
  createUserQuery,
  createCityQuery,
  createPostQuery,
  // countRows,
};
