const request = require('supertest');
const { app } = require('../src/app/app');

const config = {
  guestBookPath: 'data/comments.json',
  fileOptions: {
    defaultFile: 'homepage.html',
    path: 'public',
  },
};

describe('GET /login', () => {
  it('Should should give back an html', (done) => {
    request(app(config))
      .get('/login')
      .expect('Content-type', /html/)
      .expect(200, done)
  });
});
