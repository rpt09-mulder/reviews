const db = require('../db');
const reviews = require('./index');

const insertOne = (query) => {
  return new Promise((resolve, reject) => {
    db.client.query(query, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res.rows);
      }
    });
  });
}

const insertAll = (reviews) => {
  reviews.forEach(async (review, index) => {
    // const review = reviews[0];
    // console.log('review: ', review);
    const queryUser = {
      name: 'insertUser',
      text: 'insert into users(first) values ($1)',
      values: [review.user.user_first]
    };
    const prop_id = review.property_id;
    const {user_id, date} = review.user;
    const review_text = review.review.review_text;
    const queryReview = {
      name: 'insertReview',
      text: 'insert into reviews(property_id, user_id, date, review) values ($1, $2, $3, $4)',
      values: [prop_id, user_id, date, review_text]
    };

    const review_id = review.review.review_id;
    const { accuracy_rating, communication_rating, cleanliness_rating, location_rating, checkin_rating, value_rating} = review.ratings;
    const average_rating = (accuracy_rating + communication_rating + cleanliness_rating + location_rating + checkin_rating + value_rating) / 6
    const queryRatings = {
      name: 'insertRatings',
      text: 'insert into ratings(review_id, average, accuracy, communication, cleanliness, location, \
        checkin, value) values ($1, $2, $3, $4, $5, $6, $7, $8)',
      values: [review_id, average_rating, accuracy_rating, communication_rating, cleanliness_rating,
        location_rating, checkin_rating, value_rating]
    };

    try {
      const insertUser = await insertOne(queryUser);
      const insertReview = await insertOne(queryReview);
      const insertRating = await insertOne(queryRatings);
    } catch(err) {
      db.dbDebugger('error occured in inserting users: ', err);
    }
  });
}

insertAll(reviews);
