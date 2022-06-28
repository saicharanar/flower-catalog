const fs = require('fs');
const { createGuestBookPage } = require('./createGuestBookPage');
const { GuestBook } = require('./guestbook');

const getGuestsList = (srcFile) => {
  const guests = fs.readFileSync(srcFile, 'utf8');
  if (guests === '') {
    return [];
  }
  return JSON.parse(guests);
};

const writeTo = (srcFile, content) => {
  console.log(srcFile, content);
  fs.writeFileSync(srcFile, content, 'utf8');
};

const timeStamp = () => {
  const currentDate = new Date();
  const time = currentDate.toLocaleTimeString();
  const date = currentDate.toLocaleDateString();
  return { time, date };
};

const loadComments = (request, response, guestBook) => {
  const page = createGuestBookPage(guestBook);
  response.setHeader('Content-type', 'text/html');
  response.send(page);
};

const storeComments = (request, response, guestBook, srcFile) => {
  const { name, comment } = request.queryParams;
  const { time, date } = timeStamp();

  guestBook.addGuest({ name, comment, time, date });
  response.statusCode = 301;
  response.setHeader('Location', '/comments');
  response.send('');
};

const commentsHandler = () => {
  const srcFile = 'data/comments.json';
  const guests = getGuestsList(srcFile);
  const guestBook = new GuestBook(guests);

  return (request, response) => {
    const { uri, queryParams } = request;
    if (uri !== '/comments') {
      return false;
    }

    if (queryParams.name && queryParams.comment) {
      storeComments(request, response, guestBook);
      writeTo(srcFile, guestBook.getGuests());
      return true;
    }

    loadComments(request, response, guestBook);
    return true;
  };
};

module.exports = { commentsHandler };
