const fs = require('fs');
const request = require('request');
const path = require('path');
const s3Upload = require('../services/aws');

module.exports = {
  readFile: function(filename) {
    return new Promise((resolve, reject) => {
      fs.readFile(filename, 'utf8', function(err, data) {
        if (err) {
          reject(err);
        } else {
          console.log('OK: ' + filename);
          // console.log(data);
          resolve(data);
        }
      });
    })
  },
  download: function(url, filename, callback) {
    request.head(url, (err, res, body) => {
      // console.log('content-type: ', res.headers['content-type']);
      // console.log('content-length: ', res.headers['content-length']);
      request(url).pipe(fs.createWriteStream(filename)).on('close', callback)
    });
  },
  saveImagesAndS3Upload: function(text) {
    return new Promise((resolve, reject) => {
      const images = text.split('\n');
      const dir = path.join(__dirname, '../images/');
      for (let i = 0; i < images.length; i++) {
        let filePath = dir + 'pet_' + (i + 1) + '.jpg';
        this.download(images[i], filePath, () => {
          s3Upload(filePath)
            .then(() => {
              if (i === images.length - 1) {
                resolve({done: true});
              } 
            })
            .catch(err => {
              reject(err);
            });
        });
      }
    });
  }
}