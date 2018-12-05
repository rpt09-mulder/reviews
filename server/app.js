const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
// const startupDebugger = require('debug')('app:startup');
const reviews = require('../router');

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('tiny'));
app.use(express.static(__dirname + '../client/dist'));

//Routing
app.use('/reviews', reviews);

module.exports = app;