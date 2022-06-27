const { createServer } = require('net');
const { parseRequest } = require('./parseRequest');
const { serveFileContent } = require('./serveFileContent.js');
const { HTTPResponse } = require('./HTTPResponse');

const handle = (handlers) => {
  return (request, response, dirName) => {
    for (const handler of handlers) {
      if (handler(request, response, dirName)) {
        return true;
      }
    }

    return false;
  };
};

const onConnection = (socket, handle, dirName) => {
  socket.setEncoding('utf8');
  socket.on('data', (chunk) => {
    const request = parseRequest(chunk);
    console.log(request.uri, request.queryParams);
    const response = new HTTPResponse(socket);
    handle(request, response, dirName);
  });

  socket.on('error', (err) => {
    console.log(err);
  });
};

const startServer = (PORT, handle, dirName) => {
  const server = createServer((socket) => {
    onConnection(socket, handle, dirName);
  });
  server.listen(PORT, () => console.log(`server bound to ${PORT}`));
};

const main = (dirName) => {
  const handlers = [serveFileContent];
  startServer(8888, handle(handlers), dirName);
};

main(process.argv[2]);
