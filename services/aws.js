const AWS = require('aws-sdk');
const http = require('http');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { readFile, download } = require('../utilities/utils');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

AWS.config.update({
  //AWS Keys
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: 'us-east-1' // region of your bucket
});

const s3 = new AWS.S3();

// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: 'kento-firebnb',
//     acl: 'public-read',
//     metadata: function (req, file, cb) {
//       cb(null, {fieldName: file.fieldname});
//     },
//     key: function (req, file, cb) {
//       cb(null, Date.now().toString())
//     }
//   })
// })

const s3Upload = (filepath) => {
  let params = {
    Bucket: 'kento-firebnb',
    Body: fs.createReadStream(filepath),
    Key: 'folder/' + Date.now() + '_' + path.basename(filepath)
  }
  return new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        console.log('upload in: ', data.Location);
        resolve(data.Location);
      }
    });
  });
}

// s3Upload();
module.exports = s3Upload;
