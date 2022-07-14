const { main } = require('./src/app/app');
const { initializeServer } = require('./src/server/server');

const start = () => {
  const { serveFrom, guestBookPath } = process.env;
  const config = {
    guestBookPath: 'data/comments.json',
    fileOptions: {
      defaultFile: 'homepage.html',
      path: 'public',
    },
  };
  const sessionsStored = {};
  const users = {};

  main(8888, config, sessionsStored, users);
};

start();
