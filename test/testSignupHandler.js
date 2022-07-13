const request = require('supertest');
const { app } = require('../src/app/app');

const config = {
  guestBookPath: 'data/comments.json',
  fileOptions: {
    defaultFile: 'homepage.html',
    path: 'public',
  },
};
const sessionsStored = {};
const req = request(app(config, sessionsStored));

describe('/signup', () => {
  describe('GET', () => {
    it('Should give a html page back', (done) => {
      req
        .get('/signup')
        .expect('content-type', /html/)
        .expect(200, done);
    });
  });
});