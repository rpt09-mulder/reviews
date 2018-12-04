const request = require('supertest');
const db = require('../db');
const reviews = require('../dummydata');
const seed = require('../dummydata/seed');

let server;

describe('/reviews', () => {
  beforeEach(() => {
    server = require('../server');
    // const clear = await db.clearRecords(['users', 'reviews', 'ratings'])
  });
  afterEach(() => {
    server.close();
  });

  describe('GET /reviews', () => {
    it('should return status 200', async () => {
      const res = await request(server).get('/reviews');
      expect(res.status).toBe(200);
    });
    it('should return all reviews', async () => {
      // const insertAll = await seed.insertAll(reviews);
      const res = await request(server).get('/reviews');
      expect(res.body.length).toBeGreaterThanOrEqual(100);
    });
  });
})