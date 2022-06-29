const { createTag } = require('tag');
const fs = require('fs');

class GuestBook {
  #guests;
  constructor(guests) {
    this.#guests = guests;
  }

  addGuest(guest) {
    this.#guests.push(guest);
  }

  getGuests() {
    return JSON.stringify(this.#guests);
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
