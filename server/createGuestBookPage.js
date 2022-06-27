const { createTag } = require('./createTag');
const createList = (list) => {
  return list
    .map(({ name, comment, time, date }) => {
      return createTag([
        'div',
        {},
        `${date} - ${time} <br> ${name} : ${comment} <br><br>`,
      ]);
    })
    .join('');
};

const createForm = () => {
  return '<form action="comments" method="get"><label for="name">Name: </label><input type="text" name="name" id="name" /><label for="comment">Comment: </label><textarea id="comment" name="comment" rows="5" cols="50"></textarea><input type="submit" value="Submit" /></form>';
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

const createHead = () => {
  const link = createTag([
    'link',
    {
      rel: 'stylesheet',
      href: 'css/comments-style.css',
    },
  ]);

  return createTag(['head', {}, link]);
};

const createGuestBookPage = (guestList) => {
  const head = createHead();
  const body = createBody(guestList);
  return createTag(['html', {}, head + body]);
};

exports.createGuestBookPage = createGuestBookPage;
