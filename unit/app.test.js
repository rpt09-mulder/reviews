const supertest = require('supertest');
const app = require('../server/app');
const request = supertest(app);

//Although db module is not used here, db needs to be mocked for function to run
const db = require('../db');
jest.mock('../db');

describe('/reviews', () => {
  test('should respond to GET request with status 200', (done) => {
    request.get('/reviews/1').then((res) => {
      expect(res.status).toBe(200);
      done();
    });
  });
  test('should respond with 404 if no param id provided', (done) => {
    request.get('/reviews')
      .expect(404, done);
  });
  test('should respond with 404 for everything else', (done) => {
    request.get('/')
      .expect(404, done);
  });
});