const { serveFileContent } = require('./serveFileContent.js');
const { commentsHandler } = require('./commentsHandler');
const { downloadsHandler } = require('./downloadsHandler');
const { startServer } = require('server');

const main = (dirName) => {
  const handlers = [
    // commentsHandler(),
    serveFileContent(dirName),
  ];
  startServer(8888, ...handlers);
};

main(process.argv[2]);
