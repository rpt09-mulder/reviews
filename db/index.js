const pg = require('pg');
const db = require('../startup/database');

// Converting numeric str type to number in postGres
const PG_DECIMAL_OID = 1700;
pg.types.setTypeParser(PG_DECIMAL_OID, parseFloat);

// DB functions
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
  clearRecords: function(tableNames) {
    return new Promise((resolve) => {
      tableNames.forEach((table, index) => {
        let queryStr = `DELETE FROM ${table} RETURNING *`;
        this.queryDB(queryStr);
        if (index === tableNames.length - 1) {
          resolve();
        }
      });

    });
  },
  getReviewsById: function(id) {
    const queryStr = `select users.first as first, users.avatar as avatar, \
    reviews.date as date, reviews.review as review, reviews.reply as reply, \
    ratings.average as avgRate, ratings.accuracy as acc_rate, ratings.communication as commRate, \
    ratings.cleanliness as cleanRate, ratings.location as locRate, ratings.checkin as checkinRate, \
    ratings.value as valueRate from users \
    join reviews \
    on users.id = reviews.user_id \
    join ratings \
    on ratings.review_id = reviews.id \
    where reviews.property_id = ${id}`;
    const query = {
      name: 'getReviews',
      text: queryStr
    }
    return this.queryDB(query);
  }
};