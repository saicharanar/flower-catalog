const { serveFileContent } = require('../app/serveFileContent.js');
const { commentsHandler } = require('../app/commentsHandler');
const { startServer } = require('server');

const app = (dirName) => {
  const handlers = [commentsHandler(), serveFileContent(dirName)];
  startServer(8888, ...handlers);
};

app(process.argv[2]);
