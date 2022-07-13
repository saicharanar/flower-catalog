const { app } = require('./src/app/app');
const { initializeServer } = require('./src/server/server');

const main = () => {
  const { serveFrom, guestBookPath } = process.env;
  const config = {
    guestBookPath,
    fileOptions: {
      defaultFile: 'homepage.html',
      path: serveFrom,
    },
  };
  const sessionsStored = {};
  initializeServer(8888, app(config, sessionsStored));
};

main();
