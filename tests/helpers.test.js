const pg = require('../helpers');
const axios = require('axios');

const fetchReviews = () => {
  return axios
    .get('http://127.0.0.1:3003/reviews')
    // .then(res => {
    //   return res.data;
    // })
    // .catch(err => 'err');
}

test('GET request to /reviews endpoint should return 100 records', () => {
  // expect.assertions(1);
  // return fetchReviews()
  //   .then((data) => {
  //     console.log('reviews: ',reviews);
  //     expect(reviews.length).toEqual(100);
  //   })
})