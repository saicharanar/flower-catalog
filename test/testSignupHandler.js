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
const req = request(initializeApp(config, sessionsStored, users));

describe('/signup', () => {
  describe('GET', () => {
    it('Should give a html page back', (done) => {
      req
        .get('/signup')
        .expect('content-type', /html/)
        .expect(200, done);
    });
  });

  describe('POST', () => {
    it('Should redirect to homepage', (done) => {
      req
        .post('/signup')
        .send('username=sai&password=a')
        .expect('location', '/homePage.html')
        .expect(302, done);
    });

    it('Should give a invalid response page when username not specified', (done) => {
      req
        .post('/signup')
        .send('password=a')
        .expect('Content-type', /html/)
        .expect(/Not a valid response/)
        .expect(200, done);
    });

    it('Should give a invalid response page when password not specified', (done) => {
      req
        .post('/signup')
        .send('username=a')
        .expect('Content-type', /html/)
        .expect(/Not a valid response/)
        .expect(200, done);
    });

    it('Should give a invalid response page when password and username not specified', (done) => {
      req
        .post('/signup')
        .send('a=b')
        .expect('Content-type', /html/)
        .expect(/Not a valid response/)
        .expect(200, done);
    });
  });
});