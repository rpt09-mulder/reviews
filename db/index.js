const pg = require('pg');
// const { Client } = require('pg');
const { Client } = pg;
//Setting up debugging environment and env variables
require('dotenv').config();
const dbDebugger = require('debug')('app:db');

// Converting numeric str type to number in postGres
const PG_DECIMAL_OID = 1700;
const connectionString = process.env.DB_URL;
pg.types.setTypeParser(PG_DECIMAL_OID, parseFloat);

// Connecting DB
const client = new Client(connectionString);

client.connect(() => {
  dbDebugger('connected to db!');
});

// DB functions
module.exports = {
  client, 
  dbDebugger,
  queryDB: function(query) {
    return new Promise((resolve, reject) => {
      client.query(query, (err, res) => {
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
};