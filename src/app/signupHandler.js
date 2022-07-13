const { createFormPage } = require('./createFormPage');
const { createTag } = require('tag');

const createUser = (req, res, next) => {
  const { username, password } = req.bodyParams;
  req.users[username] = { username, password };
  res.statusCode = 302;
  res.setHeader('Location', '/');
  res.end('Registered Successfully');
  return;
};

const serveSignUpPage = (req, res, next) => {
  res.setHeader('Content-type', 'text/html');
  res.end(createFormPage('signup', 'login'));
  return;
};

const warnInvalidUserName = (req, res, next) => {
  const invalidMessage = 'Not a valid response';
  const message = createTag(['div', {}, invalidMessage]);
  const page = createFormPage('signup', 'login');
  res.setHeader('Content-type', 'text/html');
  res.end(page + message);
  return;
};

const signupRouter = (req, res, next) => {
  const { pathname } = req.url;
  if (pathname !== '/signup') {
    next();
    return;
  }

  if (req.method === 'GET') {
    serveSignUpPage(req, res, next);
    return;
  }

  const { username, password } = req.bodyParams;
  if (req.method === 'POST' && username && password) {
    createUser(req, res, next);
    return;
  } else {
    warnInvalidUserName(req, res, next);
    return;
  }

  next();
};

module.exports = { signupRouter };
