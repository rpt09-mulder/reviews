const fs = require('fs');
const request = require('request');
const path = require('path');

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
      console.log('content-type: ', res.headers['content-type']);
      console.log('content-length: ', res.headers['content-length']);
      request(url).pipe(fs.createWriteStream(filename)).on('close', callback)
    });
  },
  saveImages: function(text) {
    return new Promise((resolve, reject) => {
      const images = text.split('\n');
      const dir = path.join(__dirname, '../images/');
      for (let i = 0; i < 2; i++) {
        this.download(images[i], dir + 'pet_' + i + '.jpg', () => {
          console.log('done');
          if (i === 1) {
            resolve();
          } 
        })
      }
    })
  }
}