# Firebnb

> This is the reviews microservice for the Airbnb clone, Firebnb

## Related Projects

  - https://github.com/rpt09-mulder/gallery
  - https://github.com/rpt09-mulder/booking
  - https://github.com/rpt09-mulder/rooms
  
## Table of Contents

- 1.1 [Usage](#Usage)
  - 1.1.1 [API endpoints](#API endpoints)
  - 1.1.2 [Component](#Component)
- 1.2 Development Setup
- 1.3 Online requirements
- 1.4 Log
  - 1.4.1 Seeding the DB
  - 1.4.2 Setting up API
  - 1.4.3 Unit/ Integration tests
  - 1.4.4 Page layout
  - 1.4.5 React Setup
  - 1.4.6 Proxy service 
  - 1.4.7 AWS RDS (Relational Database Service)
  - 1.4.8 AWS S3 (Simple Storage Service)
  - 1.4.9 Performance


## 1.1 Usage
This App is part of an Airbnb clone.  
This service/ component is the reviews service, which consists of two main aspects: displaying reviews, and searching for reviews.  
In order to display the proper data to the user, the endpoints below are used:

### 1.1.1 API endpoints
- `/reviews/:id` 
  - returns all data (reviews, users, ratings)
- `/reviews/:id?search=true&keyWords=word1,word2...` 
  - returns reviews with included keyWords
- `/reviews/:id?search=false` 
  - returns all reviews
- `/ratings/:id` 
  - returns average rating and number of reviews.  

### 1.1.2 Component
The Reviews component has the two main features (displaying reviews and allows searching).  Secondary features includes displaying a ...see more for text with 280 characters or greater, and pagination for quanities of reviews of greater than 7.  

## 1.2 Development Setup
This service uses the following dev stack:

 - Server: node / NPM
 - Deployment: docker on ec2 aws
 - Client: react
 - DB: PostgreSQL (installed via brew)
 - Testing: jest
 - Important Libs:
   - faker.js
   - jw-react-pagination
   - aws-sdk
 
Postgres can be installed through homebrew.  For more information, see [postgres install guide](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-18-04)

```
## install npm dependencies
$> cd /path/to/reviews-service
$> npm install
# install and start service (if no brew, see above note!)
$> brew install PostgreSQL
$> brew services start postgresql
# create the db with `createdb` command
$> createdb firebnb-reviews
# seed  db
$> npm run seed-database
$> pql firebnb-reviews #to enter psql repl,  to confirm creation
$ (repl)> \dt; #to show all tables (should see 'paths now)
$ (repl)> \q; #to exit repl
```  
Inside `.env` place your Server + SQL credentials and/or AWS credentials
```
HOST=localhost
PORT=3003
DB_HOST=localhost
DB_PORT=3005
DB_USER=user
DB_PASS=password
```  
To test:

```
$> npm test #synonymous with jest ./test
# To execute:
$> npm run server-dev #should be running on 3003
# To build in react:
$> npm run start (builds once to /dist)
$> npm run build (builds once to /dist with minified version)
# or for watching file changes
$> npm run start-client (builds to /dist with --watch flag)
```

## 1.3 Online Requirements
 - AWS account  
 - bucket created within S3.  
 - For publicly viewed bucket (edit permissions to allow public read access.

## 1.4 Log
### 1.4.1 Seeding the DB
This required postgreSQL to be installed. As a convenience, the package.json script can be ran to replicate the act of doing the `psql [database] < [sqlFile]` routine.  This command creates the schema for the postgres db.  This does not populate the tables with data.  

In order to populate the data, the following npm command is run: `npm run seed-database` || node /path/to/<seed-file.js>

### Setting up aws s3 with node
AWS S3 (Simple Storage service)  
Amazon Simple Storage Service (Amazon S3) is an object storage service that offers industry-leading scalability, data availability, security, and performance. This means customers of all sizes and industries can use it to store and protect any amount of data for a range of use cases, such as websites, mobile applications, backup and restore, archive, enterprise applications, IoT devices, and big data analytics. Amazon S3 provides easy-to-use management features so you can organize your data and configure finely-tuned access controls to meet your specific business, organizational, and compliance requirements. Amazon S3 is designed for 99.999999999% (11 9's) of durability, and stores data for millions of applications for companies all around the world.

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

## Front end
Main Components: Review, Rating, Stars, Search.  
The Reviews service is split into two sections, reviewsHeader and reviews.  
The reviewsHeader has two main aspects: displays average rating/ total number of reviews, and search bar that searches reviews for related words (only important words.  See google stopWords for more details).  

### Review / Reply Component
keeps track of readMore state.  If readMore is false, component shows review text (if text length > 280), text + ...see more is shown.  Otherwise, full text is shown.  Review text is iterated over by word to determine if any of the words match the search bar keyWords.  keyWords are filtered using stopWords. 

### Search Component
keeps track of search text and on/Off state to toggle button and border-color.  When searching, if `key === 'Enter`, search is initialized and keyWords are passed up to App state.  keyWords are then passed down to ReviewsHeader, and then down to Reviews.  

In order to toggle state by clicking inside and outsice of the Search component, a wrapperRef is required.  To add wrapper ref...  
```
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }
  
  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
     this.handleState('typing', false);
    }
  }
```
We set ref on the outer div.
` <div className={styles.searchContainer} ref={this.setWrapperRef}>`  

### Stars Component
Each star is individually created using svg's.  Depending on the number of stars, full or half stars are used.  Before the stars are generated, a couple of things need to take place.  We need to determine how many of each star type is required.  
Star types: full (green), full (gray), half (green).  
Average rating values are decimal points outside of 0.5 increments, so the average needs to be rounded to the nearest 0.5.  
`average = Math.round(average * 2) / 2;`  
Once this is done, to determine the number of green stars, we subtract 0.5 if this is a half value (ex 3.5, 4.5).  
```
 const half = (!!((average / 0.5) % 2));
  let numStars = average;
  if (half) {
    numStars = average - 0.5;
  }
```
Using the average rating and if 0.5 had been subtracted or not, the number of gray stars can be determined.  
```
const greenStars = [...Array(numStars)];
const greyStars = half ? [...Array(4 - numStars)] : [...Array(5 - numStars)];
```  
Arrays with empty values are created and then mapped over to return individual stars.  
First we map over green stars.  Then if there is a half value, we generate a half star, else return null.  Finally we map over gray stars.  

### Pagination and pagination Component
to add pagination, there are two items in state that are required.
```
  this.state = {
    pageOfItems: [],
    reviewItems: [...this.props.reviews]
  };
 ```  
 `pageOfItems` will change based on the page number we are on.  Each page will display 7 items/reviews.  
 In order to change this state, a function needs to be used:  
 ```
 onChangePage(pageOfItems) {
  // update local state with new page of items
  this.setState({ pageOfItems });
}
 ```
 Each review component will be displayed within a mapping function of pageOfItems: 
 ```
  {
    this.state.pageOfItems.map((item, index) => {
      return (
        <Review 
          key={index} 
          review={item} 
          keyWords={this.props.keyWords}
        />
      );
    })
  }
 ```
 
 Finally, to activate onChangePage, a Pagination component needs to be created.  
 The pagination component is created using `// import JwPagination from 'jw-react-pagination';`  
 
 However, since the styling was not customizable using this method, the Pagination component code was copied and pasted from the npm package to a separate Pagination Component.  
 
 To generate a Pagination component:  
 ```
 <Pagination 
    items={this.state.reviewItems} 
    onChangePage={this.onChangePage} 
    pageSize={7}
    labels={customLabels}
    styles={customStyles}
  />
  ```
 
### Installing Dependencies

From within the root directory:

``` npm i aws-sdk ```  
``` const AWS = require('aws-sdk'); ```  

