const { createTag } = require('tag');

const createFormPage = (action, altAction) => {
  return createTag([
    'form',
    { action: `/${action}`, method: 'POST' },
    [
      'div',
      {},
      ['label', { for: 'username' }, 'username'],
      ['input', { type: 'text', name: 'username' }],
    ],
    ['input', { type: 'submit', value: 'Submit' }],
    ['div', {}, ['a', { href: `/${altAction}` }, altAction.toUpperCase()]],
  ]);
};

module.exports = { createFormPage };
