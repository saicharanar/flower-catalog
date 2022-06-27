const parseUri = (rawUri) => {
  const queryParams = {};
  const [uri, queryStrings] = rawUri.split('?');

  if (queryStrings) {
    const params = queryStrings.split('&');
    params.forEach((queryParam) => {
      const [param, value] = queryParam.split('=');
      queryParams[param] = value;
    });
  }

  return { uri, queryParams };
};

const parseHead = (line) => {
  const colonIndex = line.indexOf(':');
  const header = line.slice(0, colonIndex).trim().toLowerCase();
  const value = line.slice(colonIndex + 1).trim();
  return [header, value];
};

const parseHeaders = (lines) => {
  const headers = {};
  lines.forEach((line) => {
    const [header, value] = parseHead(line);
    headers[header] = value;
  });

  return headers;
};

const parseRequestLine = (line) => {
  const [method, rawUri, protocol] = line.split(' ');
  const parsedUri = parseUri(rawUri);
  return { method, ...parsedUri, protocol };
};

const splitLines = (lines) => {
  const splittedLines = lines.split('\r\n');
  return splittedLines.slice(0, -2);
};

const parseRequest = (chunk) => {
  const lines = splitLines(chunk);
  const requestLine = parseRequestLine(lines[0]);
  const headers = parseHeaders(lines.slice(1));
  return { ...requestLine, headers };
};

module.exports = { parseRequest, parseRequestLine, parseHeaders };
