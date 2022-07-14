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


const initializeApp = (port, config, sessions, users) => {
  const app = express();
  const guestHandlers = createGuestBookHandler(config);
  const { showGuests, addGuest } = guestHandlers();
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static('public'));
  app.use(injectUsers(users));
  app.use(injectCookies);
  app.use(injectSessions(sessions));
  app.get('/signup', serveSignUpPage);
  app.post('/signup', createUser);
  app.get('/login', serveLoginPage);
  app.post('/login', validateLogin);
  app.get('/show-guest-book', showGuests)
  app.post('/add-guest', addGuest);
  app.get('/logout', logoutHandler);
  return app;
};

const main = (port, config, sessions, users) => {
  const app = initializeApp(port, config, sessions, users);
  app.listen(port, () => console.log(`server bound to ${port}`));
};

module.exports = { initializeApp, main };
