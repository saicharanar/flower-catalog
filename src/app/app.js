const { createGuestBookHandler } = require('./createGuestBookHandler');
const {
  parseBodyParams,
  fileHandler,
  injectCookies,
  injectSessions,
} = require('server');
const { signupRouter } = require('./signupHandler');
const { loginRouter } = require('./loginHandler');
const { logoutHandler } = require('./logoutHandler');

const app = (config) => {
  const guestBookHandler = createGuestBookHandler(config);
  return [
    parseBodyParams,
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
