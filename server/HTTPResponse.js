const EOL = '\r\n';
const statusMessages = (code) => {
  const messages = {
    200: 'OK',
    404: 'Not Found',
  };

  return messages[code];
};

class HTTPResponse {
  #socket;
  #protocol;
  #statusCode;
  #headers;
  constructor(socket) {
    this.#socket = socket;
    this.#protocol = 'HTTP/1.1';
    this.#statusCode = 200;
    this.#headers = {};
  }

  set statusCode(code) {
    this.#statusCode = code;
  }

  #getStatusMessage() {
    return statusMessages(this.#statusCode);
  }

  get statusLine() {
    return `${this.#protocol} ${this.#statusCode} ${this.#getStatusMessage()}`;
  }

  setHeader(header, value) {
    this.#headers[header] = value;
  }

  #getHeaders() {
    return Object.entries(this.#headers)
      .map((header) => header.join(':'))
      .join(EOL);
  }

  #write(content) {
    this.#socket.write(content);
  }

  send(response) {
    this.#write(this.statusLine);
    this.#write(EOL);
    this.#write(this.#getHeaders());
    this.#write(EOL);
    this.#write(EOL);
    this.#write(response);
    this.#socket.end();
  }
}
exports.HTTPResponse = HTTPResponse;
