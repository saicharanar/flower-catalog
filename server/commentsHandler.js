const fs = require('fs');
const { createGuestBookPage } = require('./createGuestBookPage');
const { GuestBook } = require('./guestbook');

const getGuestsList = () => {
  const guests = fs.readFileSync('data/comments.json', 'utf8');
  if (guests === '') {
    return [];
  }
  return JSON.parse(guests);
};

const loadComments = (request, response, guestBook) => {
  const page = createGuestBookPage(guestBook);
  response.setHeader('Content-type', 'text/html');
  response.send(page);
};

const storeComments = (request, response, guestBook) => {
  const { name, comment } = request.queryParams;

  const currentDate = new Date();
  const time = currentDate.toLocaleTimeString();
  const date = currentDate.toLocaleDateString();

  guestBook.addGuest({ name, comment, time, date });
  response.statusCode = 301;
  response.setHeader('Location', '/comments');
  response.send('');
};

const commentsHandler = () => {
  const storageFile = 'data/comments.json';
  const guests = getGuestsList();
  const guestBook = new GuestBook(guests, storageFile);
  console.log(guestBook.html());

  return (request, response) => {
    const { uri, queryParams } = request;

    if (uri !== '/comments') {
      return false;
    }

    if (queryParams.name && queryParams.comment) {
      storeComments(request, response, guestBook);
      return true;
    }
    loadComments(request, response, guestBook);
    return true;
  };
};

module.exports = { commentsHandler };
