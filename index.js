const { app } = require('./src/app/app');
const { initializeServer } = require('./src/server/server');

const main = (serveFrom) => {
  initializeServer(8888, app(serveFrom));
};

main(process.argv[2]);
