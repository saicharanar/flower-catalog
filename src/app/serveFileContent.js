const fs = require('fs');
const path = require('path');

const contentType = (extension) => {
  const contentTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.txt': 'text/plain',
    '.jpg': 'image/jpeg',
    '.pdf': 'application/pdf',
  };

  return contentTypes[extension];
};

const serve = (req, res, resourceDir) => {
  if (req.method !== 'GET') {
    return false;
  }

  let pathname = req.url.pathname;
  if (pathname === '/') {
    pathname = '/homePage.html';
  }

  const fileName = path.join(resourceDir, pathname);
  let content;
  try {
    content = fs.readFileSync(fileName);
  } catch (error) {
    return false;
  }

  const extension = path.extname(fileName);
  res.setHeader('Content-type', contentType(extension));
  res.setHeader('Content-length', content.length);
  res.write(content);
  res.end();
  return true;
};

const serveFileContent = ({ serveFrom }) => {
  return (req, res) => {
    return serve(req, res, serveFrom);
  };
};

module.exports = { serveFileContent };
