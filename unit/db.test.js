const supertest = require('supertest');
const app = require('../server/app');
const request = supertest(app);

const db = require('../db');
jest.mock('../db');

describe('/reviews', () => {
  test('should respond to GET request with status 200', (done) => {
    request.get('/reviews').then((res) => {
      expect(res.status).toBe(200);
      done();
    });
  });
  
  test('should contain data in the response with property reviews', (done) => {
    const data = {
      reviews: [{review: true}]
    };
    db.getReviews = jest.fn().mockReturnValue(data);
    request.get('/reviews').then((res) => {
      expect(db.getReviews).toHaveBeenCalled();
      expect(res.body).toHaveProperty('reviews');
      done();
    });
  });
});