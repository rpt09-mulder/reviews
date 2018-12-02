const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async(req, res) => {
  console.log('inside get!');
  const reviews = await pg.getReviews();
  res.json(reviews);
});

module.exports = router;