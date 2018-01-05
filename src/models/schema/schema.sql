DROP TABLE IF EXISTS users;

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  current_city VARCHAR(255) NOT NULL,
  date_joined DATE NOT NULL DEFAULT CURRENT_DATE
  -- image VARCHAR(255) DEFAULT '<img src="http://lorempixel.com/150/150" />'
);

-- DROP TABLE IF EXISTS user_images;
--
-- CREATE TABLE user_images (
--   img_id SERIAL PRIMARY KEY,
--   image BYTEA,
--   user_id REFERENCES users
-- );
DROP TABLE IF EXISTS cities;

CREATE TABLE cities (
  city_id SERIAL PRIMARY KEY,
  country VARCHAR(255) NOT NULL,
  city_name VARCHAR(255) UNIQUE NOT NULL
);

DROP TABLE IF EXISTS posts;

CREATE TABLE posts (
  post_id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  date_added DATE NOT NULL DEFAULT CURRENT_DATE,
  user_id INT REFERENCES users,
  city_id INT REFERENCES cities
);
