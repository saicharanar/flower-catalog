const { GuestBook } = require('./guestbook');

const createGuestBookHandler = (guestBookPath) => {
  const guestBook = new GuestBook(guestBookPath);

  return (request, response) => {
    const pathname = request.url.pathname;
    if (pathname === '/show-guest-book' && request.method === 'GET') {
      guestBook.getShowGuestsHandler(request, response);
      return true;
    }

    if (pathname === '/add-guest' && request.method === 'GET') {
      guestBook.getAddGuestsHandler(request, response);
      return true;
    }

    return false;
  };
};
exports.createGuestBookHandler = createGuestBookHandler;
