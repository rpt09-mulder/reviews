const request = require('supertest');
let server;

describe('/reviews', () => {
  beforeEach(() => {
    server = require('../server');
  });
  afterEach(() => {
    server.close();
  });

  describe('GET /reviews', () => {
    it('should return all reviews', async () => {
      const res = await request(server).get('/reviews');
      expect(res.status).toBe(200);
    });
  }
  )
})