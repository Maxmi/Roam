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
 ('UAE', 'Dubai', 'Dubai (Arabic: دبي‎‎) is a cosmopolitan metropolis and global city on the Arabian Peninsula. One of the ten most popular tourist destinations in the world, it is developing rapidly in tourism and trade. Dubai is a commercial and cultural hub of the Middle East, it is a global transport hub, and has attracted world attention through many large innovative construction projects and sports events. The city is symbolised by its skyscrapers, including the world''s tallest building, Burj Khalifa, in addition to ambitious development projects including man-made islands, world class luxury hotels, and some of the largest and extraordinarily modern shopping malls in the world.'),
 ('Australia', 'Sydney', 'Sydney is the Harbour City. It is the largest, oldest and most cosmopolitan city in Australia with an enviable reputation as one of the world''s most beautiful and liveable cities. Brimming with history, nature, culture, art, fashion, cuisine, design, it is set next to miles of ocean coastline and sandy surf beaches. The city is also home to the Sydney Opera House and the Sydney Harbour Bridge, two of the most iconic structures on the planet. Sydney is a major global city and an important finance centre in the Asia-Pacific region.The city is surrounded by nature and national parks, which extend through the suburbs and right to the shores of the harbour.');

DROP TABLE IF EXISTS posts;

CREATE TABLE posts (
  post_id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  date_added TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  user_id INT REFERENCES users,
  city_id INT REFERENCES cities
);
