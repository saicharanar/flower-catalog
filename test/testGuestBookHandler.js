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


describe('GET /show-guest-book', () => {
  it('Should give 401 when user not logged in', (done) => {
    req
      .get('/show-guest-book')
      .expect('Unauthorized')
      .expect(401, done)
  });

  it('Should give back html when user logged in', (done) => {
    const sessionsStored = { 123: { username: 'sai', sessionId: 123 } }
    request(initializeApp(1111, config, sessionsStored, users))
      .get('/show-guest-book')
      .set('Cookie', 'sessionId=123')
      .expect('Content-type', /html/)
      .expect(200, done)
  });
});

describe('POST /add-guest', () => {
  it('Should give back 304 code if name is not provided ', (done) => {
    const sessionsStored = { 123: { username: 'sai', sessionId: 123 } }
    request(initializeApp(1111, config, sessionsStored, users))
      .post('/add-guest')
      .set('Cookie', 'sessionId=123')
      .send("comment=sai")
      .expect(304, done)
  });

  it('Should give back 304 code if comment is not provided ', (done) => {
    const sessionsStored = { 123: { username: 'sai', sessionId: 123 } }
    request(initializeApp(1111, config, sessionsStored, users))
      .post('/add-guest')
      .set('Cookie', 'sessionId=123')
      .send("name=sai")
      .expect(304, done)
  });

  it('Should give back html page after adding guest', (done) => {
    const sessionsStored = { 123: { username: 'sai', sessionId: 123 } }
    request(initializeApp(1111, config, sessionsStored, users))
      .post('/add-guest')
      .set('Cookie', 'sessionId=123')
      .send("name=sai&comment=yo")
      .expect('Content-type', /html/)
      .expect(200, done)
  });
});
