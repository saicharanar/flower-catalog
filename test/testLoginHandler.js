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
    it('Should give 304 when no username or password specified', (done) => {
      req
        .post('/login')
        .send('age=10')
        .expect(304, done)
    });

    it('Should give 304 when no user is registered', (done) => {
      req
        .post('/login')
        .send('age=10')
        .expect(304, done)
    });

    it('Should give 302 when a valid user logged and creates a session', (done) => {
      const sessionsStored = {};
      const users = { sai: { username: 'sai', password: 'a' } };
      request(app(config, sessionsStored, users))
        .post('/login')
        .send('username=sai&password=a')
        .expect('New Session created')
        .expect('Set-Cookie', /sessionId/)
        .expect('location', '/show-guest-book')
        .expect(302, done)
    });

    it('Should give 304 when a invalid credentials given', (done) => {
      const sessionsStored = {};
      const users = { sai: { username: 'sai', password: 'a' } };
      request(app(config, sessionsStored, users))
        .post('/login')
        .send('username=sai&password=b')
        .expect(304, done)
    });
  });
});

