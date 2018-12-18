const app = require('../server/app');

//setup env variavles
require('dotenv').config();

const port = process.env.PORT || 3003;
const server = app.listen(port, () => {
  console.log(`listening on port ${port}`);
  console.log('host: ', process.env.RDS_HOST);
});

module.exports = server;