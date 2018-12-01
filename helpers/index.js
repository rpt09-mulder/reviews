const db = require('../db');

module.exports = {
  queryDB: function(query) {
    return new Promise((resolve, reject) => {
      db.client.query(query, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res.rows);
        }
      });
    });
  },
  getReviews: function() {
    const queryStr = 'select users.first as first, users.avatar as avatar, \
    reviews.date as date, reviews.review as review, reviews.reply as reply, \
    ratings.average as avgRate, ratings.accuracy as acc_rate, ratings.communication as commRate, \
    ratings.cleanliness as cleanRate, ratings.location as locRate, ratings.checkin as checkinRate, \
    ratings.value as valueRate from users \
    join reviews \
    on users.id = reviews.user_id \
    join ratings \
    on ratings.review_id = reviews.id';
    const query = {
      name: 'getReviews',
      text: queryStr
    }
    return this.queryDB(query);
  }
}