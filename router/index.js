const express = require('express');
const router = express.Router();
const pg = require('../helpers');

router.get('/', async(req, res) => {
  const reviews = await pg.getReviews();
  res.json(reviews);
});

module.exports = router;