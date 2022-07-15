const { GuestBook } = require('./guestbook');
const { createGuestBookPage } = require('./createGuestBookPage');
const fs = require('fs');

const timeStamp = () => {
  const currentDate = new Date();
  const time = currentDate.toLocaleTimeString();
  const date = currentDate.toLocaleDateString();
  return { time, date };
};


const readGuests = (guestBookPath) => {
  const guests = fs.readFileSync(guestBookPath, 'utf8');
  if (guests) {
    return JSON.parse(guests);
  }
  return [];
};

const saveGuest = (guestBookPath, guests) => {
  fs.writeFileSync(guestBookPath, JSON.stringify(guests), 'utf8');
};

const createGuestBookHandler = ({ guestBookPath }) => {
  const guests = readGuests(guestBookPath);
  const guestBook = new GuestBook(guests);

  const showGuests = (req, res, next) => {
    if (!req.session) {
      res.sendStatus(401);
      res.end();
      return;
    }

    const page = createGuestBookPage(guestBook.html());
    res.setHeader('Content-type', 'text/html');
    res.write(page);
    res.end();
    return true;
  }

  const addGuest = (req, res, next) => {
    const { name, comment } = req.body;
    if (!name || !comment) {
      res.sendStatus(304);
      res.end();
      return;
    }

    const { date, time } = timeStamp();
    guestBook.insert({ name, comment, date, time });
    res.set('Content-type', 'text/html');
    res.end(guestBook.html());
    saveGuest(guestBookPath, guestBook.guests)
    return true;
  }

  return () => {
    return { showGuests, addGuest }
  };
}

exports.createGuestBookHandler = createGuestBookHandler;
