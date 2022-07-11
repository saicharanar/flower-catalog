const { createTag } = require('Tag');

const createGuestBookPage = (guestbook) => {
  return createTag([
    'html',
    {},
    [
      'head',
      {},
      ['link', { rel: 'stylesheet', href: 'css/comments-style.css' }],
      ['script', { src: 'guestBookScript.js' }],
    ],
    [
      'body',
      {},
      [
        'header',
        {},
        ['h1', {}, ['a', { href: 'homePage.html' }, '<<'], 'Guest Book'],
        ['a', { href: '/logout' }, 'logout'],
      ],
      [
        'main',
        {},
        ['h3', {}, 'leave a comment'],
        [
          'form',
          { action: 'add-guest', method: 'post' },
          ['label', { for: 'Name' }, 'Name'],
          ['input', { type: 'text', name: 'name', id: 'name' }],
          ['label', { for: 'comment' }, 'comment'],
          [
            'textarea',
            { id: 'comment', name: 'comment', rows: '5', cols: '50' },
          ],
          ['button', { id: 'submit' }, 'Submit'],
        ],
        ['div', { id: 'comments' }, guestbook],
      ],
    ],
  ]);
};

exports.createGuestBookPage = createGuestBookPage;
