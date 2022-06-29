const { app } = require('./src/app/app');
const { initializeServer } = require('./src/server/server');

const main = (serveFrom) => {
  const config = {
    serveFrom: './public',
    guestBookPath: 'data/comments.json',
  };

  initializeServer(8888, app(config));
};

main(process.argv[2]);
