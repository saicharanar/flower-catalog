const { app } = require("../src/app/app");
const request = require('supertest');
const assert = require('assert');

const config = {
  guestBookPath: 'data/comments.json',
  fileOptions: {
    defaultFile: 'homepage.html',
    path: 'public',
  },
};

describe('GET /logout', () => {
  it('Should give 401 if no session is alive', (done) => {
    const sessions = {};
    request(app(config, sessions))
      .get('/logout')
      .expect('Please login first')
      .expect(401, done)
  });

  it('Should give 301 if a session is alive', (done) => {
    const sessions = { 123: { username: 'sai', sessionId: 123 } };
    const users = { sai: { username: 'sai', password: 'a' } };
    request(app(config, sessions, users))
      .get('/logout')
      .set('Cookie', 'sessionId=123')
      .expect('Set-Cookie', /Max-Age=0/)
      .expect('Location', '/')
      .expect('sai loggedOut')
      .expect(302, (err, res) => {
        done(err);
        assert.ok(!sessions[123]);
      })
  });
});