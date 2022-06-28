const { createTag } = require('./createTag');
const fs = require('fs');

class GuestBook {
  #guests;
  #storageFile;
  constructor(guests, storageFile) {
    this.#guests = guests;
    this.#storageFile = storageFile;
  }

  #write() {
    fs.writeFileSync(this.#storageFile, JSON.stringify(this.#guests), 'utf8');
  }

  addGuest(guest) {
    this.#guests.push(guest);
    this.#write();
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
