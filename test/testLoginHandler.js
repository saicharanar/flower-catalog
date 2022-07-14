const request = require('supertest');
const { initializeApp } = require('../src/app/app');

const config = {
  guestBookPath: 'test/data/testComments.json',
  fileOptions: {
    defaultFile: 'homepage.html',
    path: 'public',
  },
};
const sessionsStored = {};
const users = {};
const req = request(initializeApp(1111, config, sessionsStored, users));

describe('/login', () => {
  describe('GET', () => {
    it('Should should give back an html', (done) => {
      req
        .get('/login')
        .expect('Content-type', /html/)
        .expect(200, done);
    });

    it('Should redirect to guest book if already logged in', (done) => {
      const sessionsStored = { 123: { username: 'sai', sessionId: 123 } };
      request(initializeApp(1111, config, sessionsStored, users))
        .get('/login')
        .set('Cookie', 'sessionId=123')
        .expect('Location', /guest/)
        .expect(302, done);
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
      request(initializeApp(1111, config, sessionsStored, users))
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
      request(initializeApp(1111, config, sessionsStored, users))
        .post('/login')
        .send('username=sai&password=b')
        .expect(304, done)
    });
  });
});

