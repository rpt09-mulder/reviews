const { Client } = require('pg');
//Setting up debugging environment and env variables
require('dotenv').config();
const dbDebugger = require('debug')('app:db');

const connectionString = process.env.DB_URL;

// Connecting DB
const client = new Client(connectionString);

client.connect(() => {
  dbDebugger('connected to db!');
});
