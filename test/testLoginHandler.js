const request = require('supertest');
const { app } = require('../src/app/app');

const config = {
  guestBookPath: 'data/comments.json',
  fileOptions: {
    defaultFile: 'homepage.html',
    path: 'public',
  },
};

describe('/login', () => {
  const sessionsStored = {};
  const req = request(app(config, sessionsStored));
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

    it('Should give 304 when no session is alive', (done) => {
      req
        .post('/login')
        .send('age=10')
        .expect(304, done)
    });

    it('Should give 302 when a valid user logged', (done) => {
      const sessionsStored = { 123: { sessionId: 123, username: 'sai' } };
      request(app(config, sessionsStored))
        .post('/login')
        .set('Cookie', 'sessionId=123')
        .send('username=sai')
        .expect('location', '/show-guest-book')
        .expect(302, done)
    });
  });
});

