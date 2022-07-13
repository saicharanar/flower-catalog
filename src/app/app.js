const { createGuestBookHandler } = require('./createGuestBookHandler');
const {
  createRouter,
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
  return createRouter([
    parseBodyParams,
    injectCookies,
    injectSessions(),
    signupRouter,
    loginRouter,
    logoutHandler,
    guestBookHandler,
    fileHandler(config),
  ]);
};

module.exports = { app };
