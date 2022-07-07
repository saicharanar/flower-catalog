const { createGuestBookHandler } = require('./createGuestBookHandler');
const { fileHandler, injectCookies, injectSessions } = require('server');
const { signupRouter } = require('./signupHandler');
const { loginRouter } = require('./loginHandler');
const { logoutHandler } = require('./logoutHandler');

const app = (config) => {
  const guestBookHandler = createGuestBookHandler(config);
  return [
    injectCookies,
    injectSessions(),
    signupRouter,
    loginRouter,
    logoutHandler,
    guestBookHandler,
    fileHandler(config),
  ];
};

module.exports = { app };
