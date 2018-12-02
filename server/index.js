const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const db = require('../db');
const startupDebugger = require('debug')('app:startup');
const reviews = require('../router');
require('dotenv').config();

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('tiny'));
app.use(express.static(__dirname + '../client/dist'));

//Routing
app.use('/reviews', reviews);

const port = process.env.PORT || 3003;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});