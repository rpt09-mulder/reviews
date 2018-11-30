const db = require('../db');
const reviews = require('./index');

const insertOne = (query) => {
  return new Promise((resolve, reject) => {
    db.query(query, (err, res) => {
      console.log('query: ', query);
      if (err) {
        reject(err);
      } else {
        console.log('res: ', res);
        resolve(res.rows);
      }
    });
  });
}

const insertAll = async (reviews) => {
  // reviews.forEach(async (review) => {
    const review = reviews[0];
    // console.log('review: ', review);
    const queryUser = {
      name: 'insertUser',
      text: 'insert (first) values ($1)',
      values: [review.user_first]
    };

    const {property_id, user_id, date, review_text} = review;
    const queryReview = {
      name: 'insertReview',
      text: 'insert (property_id, user_id, date, review) values ($1, $2, $3, $4)',
      values: [property_id, user_id, date, review_text]
    };

    const {review_id, accuracy_rating, communication_rating, cleanliness_rating, 
      location_rating, checkin_rating, value_rating} = review;
    const average_rating = (accuracy_rating + communication_rating + cleanliness_rating + location_rating + checkin_rating + value_rating) / 6
    const queryRatings = {
      name: 'insertRatings',
      text: 'insert (review_id, average, accuracy, communication, cleanliness, location, \
        checkin, value) values ($1, $2, $3, $4, $5, $6, $7, $8)',
      values: [review_id, average_rating, accuracy_rating, communication_rating, cleanliness_rating,
        location_rating, checkin_rating, value_rating]
    };

    try {
      const insertUser = await insertOne(queryUser);
      console.log('inserted user: ', insertUser);
      const insertReview = await this.insertOne(queryReview);
      console.log('inserted review: ', insertReview);
    } catch(err) {
      console.log('error occured in inserting users: ', err);
    }
    // const insertRating = await this.insertOne(queryRatings);
    // console.log('inserted rating: ', insertRating);
    console.log('completed insertion...');
  // });
}

insertAll(reviews);
