const request = require('supertest');
const { app } = require('../src/app/app');

const config = {
  guestBookPath: 'data/testComments.json',
  fileOptions: {
    defaultFile: 'homepage.html',
    path: 'public',
  },
};

describe('GET /show-guest-book', () => {
  it('Should give 401 when user not logged in', (done) => {
    request(app(config))
      .get('/show-guest-book')
      .expect('access-denied')
      .expect(401, done)
  });

  it('Should give back html when user logged in', (done) => {
    const sessions = { 123: { username: 'sai', sessionId: 123 } }
    request(app(config, sessions))
      .get('/show-guest-book')
      .set('Cookie', 'sessionId=123')
      .expect('Content-type', /html/)
      .expect(200, done)
  });
});

describe('POST /add-guest', () => {
  it('Should give back 304 code if name is not provided ', (done) => {
    const sessions = { 123: { username: 'sai', sessionId: 123 } }
    request(app(config, sessions))
      .post('/add-guest')
      .set('Cookie', 'sessionId=123')
      .send("comment=sai")
      .expect(304, done)
  });

  it('Should give back 304 code if comment is not provided ', (done) => {
    const sessions = { 123: { username: 'sai', sessionId: 123 } }
    request(app(config, sessions))
      .post('/add-guest')
      .set('Cookie', 'sessionId=123')
      .send("name=sai")
      .expect(304, done)
  });

  it('Should give back html page after adding guest', (done) => {
    const sessions = { 123: { username: 'sai', sessionId: 123 } }
    request(app(config, sessions))
      .post('/add-guest')
      .set('Cookie', 'sessionId=123')
      .send("name=sai&comment=yo")
      .expect('Content-type', 'text/html')
      .expect(200, done)
  });
});
