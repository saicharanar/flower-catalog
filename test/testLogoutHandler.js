const request = require('supertest');
const { initializeApp } = require('../src/app/app');
const assert = require('assert');

const config = {
  guestBookPath: 'test/data/testComments.json',
  fileOptions: {
    defaultFile: 'homepage.html',
    path: 'public',
  },
};
const sessionsStored = {};
const users = {};
const req = request(initializeApp(config, sessionsStored, users));

describe('GET /logout', () => {
  it('Should give 401 if no session is alive', (done) => {
    req
      .get('/logout')
      .expect('Unauthorized')
      .expect(401, done)
  });

  it('Should give 302 if a session is alive', (done) => {
    const sessionsStored = { 123: { username: 'sai', sessionId: 123 } };
    const users = { sai: { username: 'sai', password: 'a' } };
    request(initializeApp(config, sessionsStored, users))
      .get('/logout')
      .set('Cookie', 'sessionId=123')
      .expect('Set-Cookie', /Max-Age=0/)
      .expect('Location', '/homePage.html')
      .expect(302, (err, res) => {
        done(err);
        assert.ok(!sessionsStored[123]);
      })
  });
});