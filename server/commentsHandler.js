const fs = require('fs');
const { createGuestBookPage } = require('./createGuestBookPage');

const getGuestsList = () => {
  const guests = fs.readFileSync('data/comments.json', 'utf8');
  if (guests === '') {
    return [];
  }

  return JSON.parse(guests);
};

const loadComments = (request, response) => {
  const guestList = getGuestsList();
  const page = createGuestBookPage(guestList);
  response.setHeader('Content-type', 'text/html');
  response.send(page);
};

const storeComments = (request, response) => {
  const guests = getGuestsList();
  const { name, comment } = request.queryParams;

  const currentDate = new Date();
  const time = currentDate.toLocaleTimeString();
  const date = currentDate.toLocaleDateString();

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
