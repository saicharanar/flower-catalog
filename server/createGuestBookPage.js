const { createTag } = require('./createTag');

const createGuestBookPage = (guestList) => {
  const form =
    '<form action="comments" method="get"><label for="name">Name: </label><input type="text" name="name" id="name" /><label for="name">Comment: </label><input type="text" name="comment" id="comment" /><input type="submit" value="Submit" /></form>';

  const h3 = '<h3>Leave a comment</h3>';

  const list = createTag(['ul', {}, createList(guestList)]);

  const main = createTag(['main', {}, h3 + form + list]);
  const headerLink = createTag(['a', { href: 'homePage.html' }, '<< ']);

  const header = createTag([
    'header',
    {},
    ['h1', {}, headerLink + 'Guest Book'],
  ]);
  const body = createTag(['body', {}, header + main]);

  return createTag(['html', {}, body]);
};
exports.createGuestBookPage = createGuestBookPage;
const createList = (list) => {
  return list
    .map(({ name, comment }) => {
      return createTag(['li', {}, `${name} : ${comment}`]);
    })
    .join('');
};
