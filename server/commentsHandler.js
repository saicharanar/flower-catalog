const fs = require('fs');
const { createGuestBookPage } = require('./createGuestBookPage');

const getGuestsList = () => {
  return fs.readFileSync('data/comments.json', 'utf8');
};

const loadComments = (request, response) => {
  let guestList = [];
  if (getGuestsList() !== '') {
    guestList = JSON.parse(getGuestsList());
  }

  const page = createGuestBookPage(guestList);
  response.setHeader('Content-type', 'text/html');
  response.send(page);
};

const storeComments = (request, response) => {
  let guests = getGuestsList();
  if (guests === '') {
    guests = [];
  } else {
    guests = JSON.parse(guests);
  }

  const { name, comment } = request.queryParams;
  const time = new Date().toLocaleTimeString();
  const date = new Date().toLocaleDateString();
  guests.push({ name, comment, time, date });
  fs.writeFileSync('data/comments.json', JSON.stringify(guests), 'utf8');
  loadComments(request, response);
};

const commentsHandler = (request, response) => {
  const { uri, queryParams } = request;

  if (uri === '/guestbook.html') {
    loadComments(request, response);
    return true;
  }

  if (queryParams.name && queryParams.comment) {
    storeComments(request, response);
    return true;
  }
  return false;
};

module.exports = { commentsHandler };