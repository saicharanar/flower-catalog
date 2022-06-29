const { GuestBook } = require('./guestbook');

const createGuestBookHandler = ({ guestBookPath }) => {
  const guestBook = new GuestBook(guestBookPath);

  return (request, response) => {
    const pathname = request.url.pathname;
    if (pathname === '/show-guest-book' && request.method === 'GET') {
      guestBook.showGuestsHandler(request, response);
      return true;
    }

    if (pathname === '/add-guest' && request.method === 'GET') {
      guestBook.addGuestsHandler(request, response);
      return true;
    }

    return false;
  };
};
exports.createGuestBookHandler = createGuestBookHandler;
