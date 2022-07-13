const request = require('supertest');
const { app } = require('../src/app/app');

const config = {
  guestBookPath: 'data/comments.json',
  fileOptions: {
    defaultFile: 'homepage.html',
    path: 'public',
  },
};
const req = request(app(config));

describe('/login', () => {
  describe('GET', () => {
    it('Should should give back an html', (done) => {
      req
        .get('/login')
        .expect('Content-type', /html/)
        .expect(200, done);
    });
  });
  describe('POST', () => {
    it('Should give 304 when no username specified', (done) => {
      req
        .post('/login')
        .send('age=10')
        .expect(304, done)
    });
  });
});

