const faker = require('faker');
const db = require('../helpers');

const reviews = [];

for (let i = 0; i < 100; i++) {
  reviews.push({
    property_id: 1,
    user_id: i,
    review_id: i,
    user_first: faker.name.firstName(),
    date: faker.date.past(),
    review_text: faker.lorem.paragraph(),
    accuracy_rating: faker.random.number({min: 1, max: 5}),
    communication_rating: faker.random.number({min: 1, max: 5}),
    cleanliness_rating: faker.random.number({min: 1, max: 5}),
    location_rating: faker.random.number({min: 1, max: 5}),
    checkin_rating: faker.random.number({min: 1, max: 5}),
    value_rating: faker.random.number({min: 1, max: 5})
  });
}

module.exports = reviews;


