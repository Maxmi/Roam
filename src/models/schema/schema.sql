DROP TABLE IF EXISTS users;

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  current_city VARCHAR(255) NOT NULL,
  date_joined TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  img_num INT
);


DROP TABLE IF EXISTS cities;

CREATE TABLE cities (
  city_id SERIAL PRIMARY KEY,
  country VARCHAR(255) NOT NULL,
  city_name VARCHAR(255) UNIQUE NOT NULL,
  city_info TEXT
);

INSERT INTO cities (country, city_name, city_info)
 VALUES
 ('Japan', 'Tokyo', 'nice city'),
 ('UAE', 'Dubai', 'fantastic'),
 ('Australia', 'Sydney', 'awesome city');

DROP TABLE IF EXISTS posts;

CREATE TABLE posts (
  post_id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  date_added TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  user_id INT REFERENCES users,
  city_id INT REFERENCES cities
);
