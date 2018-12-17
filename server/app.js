const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const db = require('../db');
const path = require('path');
const utils = require('../utilities/utils');
// const aws = require('../services/aws');
// const startupDebugger = require('debug')('app:startup');
// const reviews = require('../router');

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/../client/dist')));

//Routing
// app.use('/reviews', reviews);
app.get('/reviews/:id', async(req, res) => {
  console.log('inside get!!');
  const id = JSON.parse(req.params.id);
  console.log('id: ', id);
  try {
    const reviews = await db.getReviewsById(id);
    const avgRating = await db.getAverageRatings(id);

    res.status(200).json({
      ratings: avgRating[0].a,
      reviews: reviews
    });
  } catch(err) {
    console.log('err: ', err);
    res.status(404).json({error: `ID ${id} does not exist`});
  }
});

module.exports = app;