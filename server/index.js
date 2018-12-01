const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const db = require('../db');
const startupDebugger = require('debug')('app:startup');
require('dotenv').config();

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('tiny'));

//REST
app.get('/reviews', (req, res) => {
  console.log('inside get');
});

app.post('/reviews', (req, res) => {

});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});