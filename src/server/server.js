const { startServer } = require('server');

const initializeServer = (port, appHandlers) => {
  startServer(port, ...appHandlers);
};

module.exports = { initializeServer };
