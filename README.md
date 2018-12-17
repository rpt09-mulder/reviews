# Firebnb

> This is the reviews microservice for the Airbnb clone, Firebnb

## Related Projects

  - https://github.com/rpt09-mulder/gallery
  - https://github.com/rpt09-mulder/booking
  - https://github.com/rpt09-mulder/rooms
  
## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage
AWS S3 (Simple Storage service)  
Amazon Simple Storage Service (Amazon S3) is an object storage service that offers industry-leading scalability, data availability, security, and performance. This means customers of all sizes and industries can use it to store and protect any amount of data for a range of use cases, such as websites, mobile applications, backup and restore, archive, enterprise applications, IoT devices, and big data analytics. Amazon S3 provides easy-to-use management features so you can organize your data and configure finely-tuned access controls to meet your specific business, organizational, and compliance requirements. Amazon S3 is designed for 99.999999999% (11 9's) of durability, and stores data for millions of applications for companies all around the world.


## Requirements
 - AWS account  
 - bucket created within S3.  
 - For publicly viewed bucket (edit permissioons to allow public read access.
 
## Development

### Setting up aws s3 with node
``` const AWS = require('aws-sdk'); ```

Add account information from AWS: access key and secret access key.  
```
AWS.config.update({
  //AWS Keys
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: 'us-east-1' // region of your bucket
});
```

Make connection to s3  
```const s3 = new AWS.S3();```

Set params object of bucket object
```
let params = {
  Bucket: 'kento-firebnb',
  ACL: 'public-read',
  Body: fs.createReadStream(filepath),
  Key: 'folder/' + Date.now() + '_' + path.basename(filepath)
}
```
Upload file to bucket (assuming file is already in a directory.  To download, use fs.createWriteStream)
```
const s3Upload = () => {
  return new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        console.log('upload in: ', data.location);
        resolve();
      }
    });
  });
}
```

### Downloading file from url
```
const download = (url, filename, callback) => {
  request.head(url, (err, res, body) => {
    console.log('content-type: ', res.headers['content-type']);
    console.log('content-length: ', res.headers['content-length']);
    request(url).pipe(fs.createWriteStream(filename)).on('close', callback)
  });
}
```
### Installing Dependencies

From within the root directory:

``` npm i aws-sdk ```  
``` const AWS = require('aws-sdk'); ```  

