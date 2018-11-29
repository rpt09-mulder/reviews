const express = require('express');
const app = express();
const db = require('../db')
require('dotenv').config();

app.get('/reviews', (req, res) => {
  console.log('inside get');
});

app.post('/reviews', (req, res) => {

});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});