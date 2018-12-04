const faker = require('faker');
const db = require('../db');

const reviews = [];

for (let i = 1; i < 101; i++) {
  let replied = Math.round(Math.random());
  reviews.push({
    property_id: 1,
    user: {
      user_id: i,
      user_avatar: faker.image.imageUrl(),
      user_first: faker.name.firstName(),
      date: faker.date.past(),
    },
    review: {
      review_id: i,
      review_text: faker.lorem.paragraph(),
      reply_text: replied ? faker.lorem.paragraph() : '',
    },
    ratings: {
      accuracy_rating: faker.random.number({min: 1, max: 5}),
      communication_rating: faker.random.number({min: 1, max: 5}),
      cleanliness_rating: faker.random.number({min: 1, max: 5}),
      location_rating: faker.random.number({min: 1, max: 5}),
      checkin_rating: faker.random.number({min: 1, max: 5}),
      value_rating: faker.random.number({min: 1, max: 5})
    }
  });
}

module.exports = reviews;


