const { app } = require('./src/app/app');
const { initializeServer } = require('./src/server/server');

const main = () => {
  const { serveFrom, guestBookPath } = process.env;
  initializeServer(8888, app({ serveFrom, guestBookPath }));
};

main();
