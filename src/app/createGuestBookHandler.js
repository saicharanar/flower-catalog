const { GuestBook } = require('./guestbook');

const createGuestBookHandler = ({ guestBookPath }) => {
  const guestBook = new GuestBook(guestBookPath);

  return (request, response, next) => {
    const pathname = request.url.pathname;
    if (pathname === '/show-guest-book' && request.method === 'GET') {
      guestBook.showGuestsHandler(request, response);
      return;
    }

    if (pathname === '/add-guest' && request.method === 'POST') {
      guestBook.addGuestsHandler(request, response);
      return;
    }

    next();
  };
};
exports.createGuestBookHandler = createGuestBookHandler;
