const { commentsHandler } = require('./commentsHandler');
const { serveFileContent } = require('./serveFileContent');

const app = (serveFrom) => [commentsHandler(), serveFileContent(serveFrom)];

module.exports = { app };
