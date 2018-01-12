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
 ('Japan', 'Tokyo', 'Tokyo (東京 Tōkyō) is the enormous and wealthy capital of Japan, overflowing with culture, commerce and, most of all, people. The core of the most populated urban area in the world, Tokyo is a fascinating and dynamic metropolis that mixes foreign influences, consumer culture and global business along with remnants of the capital of old Japan. From modern electronics and gleaming skyscrapers to cherry blossoms and the Imperial Palace, this is a city that represents the entire sweep of Japanese history and culture. Tokyo truly has something for every traveller.'),
 ('UAE', 'Dubai', ''),
 ('Australia', 'Sydney', '');

DROP TABLE IF EXISTS posts;

CREATE TABLE posts (
  post_id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  date_added TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  user_id INT REFERENCES users,
  city_id INT REFERENCES cities
);
