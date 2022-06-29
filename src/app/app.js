const { serveFileContent } = require('./serveFileContent');
const { createGuestBookHandler } = require('./createGuestBookHandler');

const app = (config) => {
  const { serveFrom, guestBookPath } = config;
  const guestBookHandler = createGuestBookHandler(guestBookPath);
  return [guestBookHandler, serveFileContent(serveFrom)];
};

module.exports = { app };
