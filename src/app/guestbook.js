const { createTag } = require('tag');
const { createGuestBookPage } = require('./createGuestBookPage');
const fs = require('fs');

const timeStamp = () => {
  const currentDate = new Date();
  const time = currentDate.toLocaleTimeString();
  const date = currentDate.toLocaleDateString();
  return { time, date };
};

class GuestBook {
  #guestBookPath;
  #guests;
  constructor(guestBookPath) {
    this.#guestBookPath = guestBookPath;
    this.#guests = [];
  }

  #getGuests() {
    const guests = fs.readFileSync(this.#guestBookPath, 'utf8');
    if (guests) {
      return JSON.parse(guests);
    }
    return [];
  }

  initialize() {
    this.#guests = this.#getGuests();
  }

  #save() {
    fs.writeFileSync(this.#guestBookPath, JSON.stringify(this.#guests), 'utf8');
  }

  insert(guest) {
    this.#guests.unshift(guest);
    this.#save();
  }

  showGuestsHandler(request, response) {
    this.initialize();
    const page = createGuestBookPage(this.html());
    response.setHeader('Content-type', 'text/html');
    response.write(page);
    response.end();
    return true;
  }

  addGuestsHandler(request, response) {
    const name = request.url.searchParams.get('name');
    const comment = request.url.searchParams.get('comment');
    if (!(name && comment)) {
      return false;
    }

    const { date, time } = timeStamp();
    this.insert({ name, comment, date, time });
    response.statusCode = 301;
    response.setHeader('Location', '/show-guest-book');
    response.end();
    return true;
  }

  html() {
    return this.#guests
      .map(({ name, comment, time, date }) => {
        return createTag([
          'div',
          {},
          `${date} - ${time}  ${name} : ${comment}`,
        ]);
      })
      .join('');
  }
}

module.exports = { GuestBook };
