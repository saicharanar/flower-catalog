const { serveFileContent } = require('./serveFileContent');
const { createGuestBookHandler } = require('./createGuestBookHandler');

const app = (config) => {
  const guestBookHandler = createGuestBookHandler(config);
  return [guestBookHandler, serveFileContent(config)];
};

module.exports = { app };
