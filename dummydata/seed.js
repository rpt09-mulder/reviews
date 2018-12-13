const db = require('../db');
const reviews = require('./index');
const utils = require('../utilities/utils');
const path = require('path');

const insertAll = (reviews) => {
  return new Promise((resolve, reject) => {
    reviews.forEach(async (review, index) => {
      // const review = reviews[0];
      // console.log('review: ', review);
      const queryUser = {
        name: 'insertUser',
        text: 'insert into users(first, avatar) values ($1, $2)',
        values: [review.user.user_first, review.user.user_avatar]
      };
      const prop_id = review.property_id;
      const {user_id, date} = review.user;
      const {review_text, reply_text} = review.review
      const queryReview = {
        name: 'insertReview',
        text: 'insert into reviews(property_id, user_id, date, review, reply) values ($1, $2, $3, $4, $5)',
        values: [prop_id, user_id, date, review_text, reply_text]
      };
  
      const review_id = review.review.review_id;
      const { accuracy_rating, communication_rating, cleanliness_rating, location_rating, checkin_rating, value_rating} = review.ratings;
      const average_rating = ((accuracy_rating + communication_rating + cleanliness_rating + location_rating + checkin_rating + value_rating) / 6).toFixed(2);
      const queryRatings = {
        name: 'insertRatings',
        text: 'insert into ratings(review_id, average, accuracy, communication, cleanliness, location, \
          checkin, value) values ($1, $2, $3, $4, $5, $6, $7, $8)',
        values: [review_id, average_rating, accuracy_rating, communication_rating, cleanliness_rating,
          location_rating, checkin_rating, value_rating]
      };
  
      try {
        const insertUser = await db.queryDB(queryUser);
        const insertReview = await db.queryDB(queryReview);
        const insertRating = await db.queryDB(queryRatings);
        if (index === reviews.length - 1) {
          resolve();
        }
        // if (index === reviews.length - 1) resolve();
      } catch(err) {
        reject(err);
        // reject(err);
      }
    });
  })
}

const main = (async() => {
  try {
    console.log('Initializing...');
    console.log('Saving to db...');
    const insertion = await insertAll(reviews);
    console.log('data saved to db');
    console.log('processing urls...')
    const urls = await utils.readFile(path.join(__dirname, '../') + '/urls.txt');
    console.log('saving images and uploading to s3...')
    await utils.saveImagesAndS3Upload(urls);
    console.log('done!');
  } catch (err) {
    console.log('error occured in seeding: ', err);
  }
})();
