const { createFormPage } = require('./createFormPage');
const { createTag } = require('tag');

const warnInvalidUserName = (req, res, next) => {
  const invalidMessage = 'Not a valid response';
  const message = createTag(['div', {}, invalidMessage]);
  const page = createFormPage('signup', 'login');
  res.setHeader('Content-type', 'text/html');
  res.end(page + message);
  return;
};


const createUser = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    warnInvalidUserName(req, res);
    return;
  }

  req.users[username] = { username, password };
  res.redirect('/homePage.html');
  res.end();
  return;
};

const serveSignUpPage = (req, res, next) => {
  res.set('Content-type', 'text/html');
  res.end(createFormPage('signup', 'login'));
  return;
};


module.exports = { serveSignUpPage, createUser };
