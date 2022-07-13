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
const { injectUsers } = require('../injectUsers');

const app = (config, sessions, users) => {
  const guestBookHandler = createGuestBookHandler(config);
  return createRouter([
    parseBodyParams,
    injectUsers(users),
    injectCookies,
    injectSessions(sessions),
    signupRouter,
    loginRouter,
    logoutHandler,
    guestBookHandler,
    fileHandler(config),
  ]);
};

module.exports = { app };
