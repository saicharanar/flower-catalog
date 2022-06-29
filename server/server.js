const { serveFileContent } = require('./serveFileContent.js');
const { commentsHandler } = require('./commentsHandler');
const { startServer } = require('server');

const app = (dirName) => {
  const handlers = [commentsHandler(), serveFileContent(dirName)];
  startServer(8888, ...handlers);
};

app(process.argv[2]);
