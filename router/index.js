const express = require('express');
const router = express.Router();
const pg = require('../helpers');

router.get('/', async(req, res) => {
  console.log('inside get');
  const reviews = await pg.getReviews();
  console.log('reviews: ', reviews);
  res.json(reviews);
});

module.exports = router;