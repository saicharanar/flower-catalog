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
  fs.writeFileSync(srcFile, content, 'utf8');
};

const timeStamp = () => {
  const currentDate = new Date();
  const time = currentDate.toLocaleTimeString();
  const date = currentDate.toLocaleDateString();
  return { time, date };
};

const showComments = (request, response) => {
  const { guestBook } = request;

  const page = createGuestBookPage(guestBook);
  response.setHeader('Content-type', 'text/html');
  response.write(page);
  response.end();
  return true;
};

const storeComments = (request, response, srcFile) => {
  const { guestBook } = request;

  const name = request.url.searchParams.get('name');
  const comment = request.url.searchParams.get('comment');
  if (!(name && comment)) {
    return false;
  }

  const { time, date } = timeStamp();
  guestBook.addGuest({ name, comment, time, date });
  response.statusCode = 301;
  response.setHeader('Location', '/show-comments');
  response.end();
  writeTo(srcFile, guestBook.getGuests());
  return true;
};

const commentsHandler = () => {
  const srcFile = 'data/comments.json';
  const guests = getGuestsList(srcFile);
  const guestBook = new GuestBook(guests);

  return (request, response) => {
    const pathname = request.url.pathname;
    if (pathname === '/comments' && request.method === 'GET') {
      request.guestBook = guestBook;
      return storeComments(request, response, srcFile);
    }

    if (pathname === '/show-comments' && request.method === 'GET') {
      request.guestBook = guestBook;
      return showComments(request, response);
    }

    return false;
  };
};

module.exports = { commentsHandler };
