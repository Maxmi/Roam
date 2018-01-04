const db = require('./db');

const addUser = (name, email, password, city) => db.one(
  ` INSERT INTO users (name, email, password, current_city)
    VALUES ($1, $2, $3, $4)
    RETURNING *;`,
  [name, email, password, city]
);

const getUser = (email, password) => db.one(
  `SELECT * FROM users WHERE email=$1;`, [email]
);


const getUserByID = userID => db.one(
  `SELECT * FROM users WHERE id=$1;`, [userID]
);



module.exports = {
  addUser,
  getUser,
  getUserByID
};
