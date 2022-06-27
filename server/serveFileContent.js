const fs = require('fs');

const contentType = (extension) => {
  const contentTypes = {
    html: 'text/html',
    css: 'text/css',
    txt: 'text/plain',
  };

  return contentTypes[extension];
};

const serveFileContent = ({ uri }, response, dir) => {
  if (uri === '/') {
    uri = '/content.txt';
  }

  const fileName = dir + uri;
  let content;
  try {
    content = fs.readFileSync(fileName);
  } catch (error) {
    return false;
  }

  const extIndex = fileName.indexOf('.');
  const extension = fileName.slice(extIndex + 1);
  response.setHeader('Content-type', contentType(extension));
  response.setHeader('Content-length', content.length);
  response.send(content);
  return true;
};

module.exports = { serveFileContent };
