const { createTag } = require('tag');

class GuestBook {
  #guests;
  constructor(guests) {
    this.#guests = guests;
  }

  insert(guest) {
    this.#guests.unshift(guest);
  }

  get guests() {
    const { guests } = { guests: this.#guests };
    return guests;
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
