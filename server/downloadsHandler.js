const { serveFileContent } = require('./serveFileContent');

const downloadsHandler = (request, response, dirName) => {
  const { uri } = request;
  const { file } = request.queryParams;

  if (uri !== '/download') {
    return false;
  }

  serveFileContent({ uri: '/' + file }, response, dirName);
  return true;
};

module.exports = { downloadsHandler };
