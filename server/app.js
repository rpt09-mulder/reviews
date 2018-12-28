const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const db = require('../db');
const path = require('path');
const utils = require('../utilities/utils');
const pool = require('../startup/database');
const cors = require('cors');

// const aws = require('../services/aws');
// const startupDebugger = require('debug')('app:startup');
// const reviews = require('../router');

//Middleware
app.use(cors);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/../client/dist')));
app.use('/:id', express.static(path.join(__dirname, '/../client/dist')));

const client = pool.connect(() => {
  console.log('connected to db!');
});

app.get('/reviews/:id', async (req, res) => {
  const id = JSON.parse(req.params.id);
  
  try {
    const reviews = await db.getReviewsById(id);
    const avgRating = await db.getAverageRatings(id);
    if (!reviews.length) {
      res.status(404).json({error: `ID ${id} does not exist`});
    } else {
      res.json({
        ratings: avgRating[0].a,
        reviews: reviews
      });
    }
  } catch(err) {
    res.status(404).json({error: `ID ${id} does not exist`});
    console.log('err in process: ', err);
  } 
});

module.exports = app;