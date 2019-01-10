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

### Seeding
Seeding is split into a four stage process:
1. Generate x review records and randomly insert into listings 1-101 (for a total of 100 records).  
 `const insertion = await insertAll(reviews);`

   Each record/review has the following information
```
  {
      property_id: propId,
      user: {
        user_id: i,
        user_avatar: faker.image.imageUrl(),
        user_first: faker.name.firstName(),
        date: faker.date.past(),
      },
      review: {
        review_id: i,
        review_text: faker.lorem.paragraph(),
        reply_text: replied ? faker.lorem.paragraph() : '',
        reply_date: faker.date.past(),
      },
      ratings: {
        accuracy_rating: faker.random.number({min: 1, max: 5}),
        communication_rating: faker.random.number({min: 1, max: 5}),
        cleanliness_rating: faker.random.number({min: 1, max: 5}),
        location_rating: faker.random.number({min: 1, max: 5}),
        checkin_rating: faker.random.number({min: 1, max: 5}),
        value_rating: faker.random.number({min: 1, max: 5})
      }
```  
   The data is randomly generated using faker, which is a library for generating randomized fake data.  For more information see https://www.npmjs.com/package/faker.  

   To use in module, `var faker = require('faker');`  

2. Read urls from `urls.text`  
   `const urls = await utils.readFile(path.join(__dirname, '../') + '/urls.txt')`  
   A text file with urls is required for this to work.  If different images are to be used, these urls should be replaced with ones in new line format.  Each url should be on it's own line.  

3. Simulataneously save images and upload to AWS s3 bucket.  
   In order to complete this, a bucket needs to be manually created within AWS S3.  To do this, see AWS branch for more details.  Go to AWS -> S3 -> create bucket.  Ensure that the proper permissions are provided to public users.  
   `const s3Urls = await utils.saveImagesAndS3Upload(urls);`  
   This function is split into parts; first this is passed in url text (which is split into an array of urls).  This is then iterated over to individually download each url and save to s3 (one at a time).  First the url is downloaded using createWriteStream...  
```
  download: function(url, filename, callback) {
    request.head(url, (err, res, body) => {
      request(url).pipe(fs.createWriteStream(filename)).on('close', callback)
    });
  }
```  
   Once the url is downloaded, the image is uploaded into the s3 bucket using s3Upload `const s3Upload = require('../services/aws');`  
   `s3Upload` is passed a filePath of the image file to which the upload will occur from.  Once all files have been downloaded and uploaded to s3, the urls and number or urls are returned and passed to the following function.  

4. Updating urls in current Database  
   Before, we uploaded all of the fake data into the db through `insertAll`.  Now we will be updating that data as we are missing critical information... The urls of the images from aws s3!!  

   The first thing is to get an array of the same number of images as the number of records, since we want each review to have an image.  Airbnb does not have any users without images.  To do this, we pass in the number of users we inserted into the function `utils.getRandomUrls(urlsObj, users);`.  urlsObj contains the urls previously obtained and users is the total number of reviews we inserted into the db.  

   Next, we iterate over the new url Array and insert into each record.  
```
  randomUrls.forEach((url, index) => {
    if (index === randomUrls.length - 1) {
      queryStr += `(${index + 1}, '${url}')\n\
    ) as c(id, avatar)\n\
      where c.id = u.id;`;
    } else {
      queryStr += `(${index + 1}, '${url}'),\n`;
    }
  });

  const SetQuery = {
    name: 'updateUrls',
    text: queryStr
  };
  return db.queryDB(SetQuery);
};
```

5.  Finally, we release the client/pool.  This should terminate the connection to the db.  

### Parsing postgreSQL data/ creating nested objects 
A convenient feature of postgreSQL is creating nested objects.  Nested objects can be created using `json_build_object`.  Example code from the `getReviewsById` function...  
```
select
        json_build_object(
          'propertyId', re.property_id,
          'user', json_build_object(
            'id', u.id,
            'name', u.first,
            'avatarUrl', u.avatar
          ),
          'review', json_build_object(
            'id', re.id,
            'review', re.review,
            'date', re.date,
            'reply', re.reply,
            'replyDate', re.reply_date,
            'rating', json_build_object(
              'avg', round(ra.average * 2, 0) / 2,
              'acc', ra.accuracy,
              'com', ra.communication,
              'cle', ra.cleanliness,
              'loc', ra.location,
              'che', ra.checkin,
              'val', ra.value
            )
          )
        ) r
      from public.users u
      join public.reviews re on u.id = re.user_id
      join public.ratings ra on re.id = ra.review_id
      where re.property_id = ${id};`;
  ```  
A few things to note here: `r` is used as the json_object for review.  This could be anything, but cannot be blank.  `u` replaces `user` and `re` replaces `review`.  For the `avg` property on the rating object, we use `(ra.average * 2, 0) / 2` to get the value rounded to two decimal places.  Similarly, the `getAverageRatings` function averages all of the records rating for the particular rating (Ex, location, communication, accuracy).
```
  getAverageRatings: function(id) {
    const queryStr = `select 
      json_build_object(
        'avg', round(avg (average) * 2, 0) / 2,
        'acc', round(avg (accuracy) * 2, 0) / 2,
        'com', round(avg (communication) * 2, 0) / 2,
        'cle', round(avg (cleanliness) * 2, 0) / 2,
        'loc', round(avg (location) * 2, 0) / 2,
        'che', round(avg (checkin) * 2, 0) / 2,
        'val', round(avg (value) * 2, 0) / 2
      ) a
      from ratings
      inner join reviews 
      on ratings.review_id = reviews.id
      where reviews.property_id = ${id}`;

    const query = {
      name: 'getAvgs',
      text: queryStr
    };
    return this.queryDB(query);
  }
```  
The data is created using json_build_object.  The columns are averaged using the `avg` keyword.  

### Front end

### Installing Dependencies

From within the root directory:

``` npm i aws-sdk ```  
``` const AWS = require('aws-sdk'); ```  

