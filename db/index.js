const { Client }= require('pg');
require('dotenv').config();
const dbDebugger = require('debug')('app:db');

const connectionString = process.env.DB_URL;
const client = new Client(connectionString);

client.connect(() => {
  dbDebugger('connected to db!');
});
module.exports = {client, dbDebugger};