const { serveFileContent } = require('./serveFileContent');
const { createGuestBookHandler } = require('./createGuestBookHandler');
const { fileHandler } = require('server');

const app = (config) => {
  const guestBookHandler = createGuestBookHandler(config);
  return [guestBookHandler, fileHandler(config)];
};

module.exports = { app };
