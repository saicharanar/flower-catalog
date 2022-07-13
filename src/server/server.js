const { startServer } = require('server');

const initializeServer = (port, router) => {
  startServer(port, router);
};

module.exports = { initializeServer };
