const { createGuestBookHandler } = require('./createGuestBookHandler');
const {
  injectCookies,
  injectSessions,
} = require('server');
const express = require('express');
const { serveSignUpPage, createUser } = require('./signupHandler');
const { serveLoginPage, validateLogin } = require('./loginHandler');
const { logoutHandler } = require('./logoutHandler');
const { injectUsers } = require('../injectUsers');


const initializeApp = (config, sessions, users) => {
  const app = express();
  app.use(express.urlencoded({ extended: true }));

  const guestHandlers = createGuestBookHandler(config);
  const { showGuests, addGuest } = guestHandlers();

  app.use(express.static('public'));
  app.use(injectUsers(users));
  app.use(injectCookies);
  app.use(injectSessions(sessions));

  app.get('/signup', serveSignUpPage);
  app.post('/signup', createUser);

  app.get('/login', serveLoginPage);
  app.post('/login', validateLogin);
  app.get('/logout', logoutHandler);

  app.get('/show-guest-book', showGuests)
  app.post('/add-guest', addGuest);

  return app;
};

module.exports = { initializeApp };
