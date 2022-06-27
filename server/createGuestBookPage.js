const { createTag } = require('./createTag');
const createList = (list) => {
  return list
    .map(({ name, comment, time, date }) => {
      return createTag([
        'div',
        {},
        `${date} - ${time} <br> ${name} : ${comment} <br>`,
      ]);
    })
    .join('');
};

const createForm = () => {
  return '<form action="comments" method="get"><label for="name">Name: </label><input type="text" name="name" id="name" /><label for="name">Comment: </label><input type="text" name="comment" id="comment" /><input type="submit" value="Submit" /></form>';
};

const createMain = (guestList) => {
  const form = createForm();
  const h3 = '<h3>Leave a comment</h3>';
  const comments = createTag([
    'div',
    { class: 'comments' },
    createList(guestList),
  ]);
  return createTag(['main', {}, h3 + form + comments]);
};

const createBody = (guestList) => {
  const main = createMain(guestList);
  const headerLink = createTag(['a', { href: 'homePage.html' }, '<< ']);
  const header = createTag([
    'header',
    {},
    ['h1', {}, headerLink + 'Guest Book'],
  ]);
  return createTag(['body', {}, header + main]);
};

const createGuestBookPage = (guestList) => {
  const body = createBody(guestList);
  return createTag(['html', {}, body]);
};

exports.createGuestBookPage = createGuestBookPage;
