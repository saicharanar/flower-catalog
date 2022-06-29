const { createTag } = require('Tag');

const createGuestBookPage = (guestbook) => {
  return createTag([
    'html',
    {},
    [
      'head',
      {},
      ['link', { rel: 'stylesheet', href: 'css/comments-style.css' }],
    ],
    [
      'body',
      {},
      [
        'header',
        {},
        ['h1', {}, ['a', { href: 'homePage.html' }, '<<'], 'Guest Book'],
      ],
      [
        'main',
        {},
        ['h3', {}, 'leave a comment'],
        [
          'form',
          { action: 'comments', method: 'get' },
          ['label', { for: 'Name' }, 'Name'],
          ['input', { type: 'text', name: 'name', id: 'name' }],
          ['label', { for: 'comment' }, 'comment'],
          [
            'textarea',
            { id: 'comment', name: 'comment', rows: '5', cols: '50' },
          ],
          ['input', { type: 'submit', value: 'Submit' }],
        ],
        ['div', { class: 'comments' }, guestbook.html()],
      ],
    ],
  ]);
};

exports.createGuestBookPage = createGuestBookPage;
