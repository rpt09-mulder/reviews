DROP SCHEMA public CASCADE;

CREATE SCHEMA public;

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  first text,
  avatar text
);

CREATE TABLE IF NOT EXISTS reviews (
  id SERIAL PRIMARY KEY,
  property_id integer,
  user_id integer,
  date text,
  review text,
  reply text,
  reply_date text,
  FOREIGN KEY (user_id) 
  REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS ratings (
  id SERIAL PRIMARY KEY,
  review_id integer,
  average numeric(4,2),
  accuracy integer,
  communication integer,
  cleanliness integer,
  location integer,
  checkin integer,
  value integer,
  FOREIGN KEY (review_id) 
  REFERENCES reviews(id)
);
