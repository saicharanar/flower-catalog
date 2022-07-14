const { GuestBook } = require('./guestbook');

const createGuestBookHandler = ({ guestBookPath }) => {
  const guestBook = new GuestBook(guestBookPath);

  const showGuests = (req, res, next) => {
    guestBook.showGuestsHandler(req, res);
  }

  const addGuest = (req, res, next) => {
    guestBook.addGuestsHandler(req, res);
  }

  return () => {
    return { showGuests, addGuest }
  };
}

exports.createGuestBookHandler = createGuestBookHandler;
