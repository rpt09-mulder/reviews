const { Client }= require('pg');
require('dotenv').config();

const connectionString = process.env.DB_URL;
const client = new Client(connectionString);

// const client = new Client({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASS,
//   port: 3211
// })

client.connect();
module.exports = client;