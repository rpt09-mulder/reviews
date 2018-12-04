const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async(req, res) => {
  const reviews = await db.getReviews();
  res.status(200).json(reviews);
});

module.exports = router;