const { createFormPage } = require('./createFormPage');

const validateLogin = (req, res, next) => {
  const { username } = req.bodyParams;
  if (!req.session || !username) {
    res.statusCode = 304;
    res.end();
    return;
  }

  if (username === req.session.username) {
    res.statusCode = 302;
    res.setHeader('Location', '/show-guest-book');
    res.end();
    return;
  } else {
    res.statusCode = 304;
    res.end();
  }

  return;
};

const loginRouter = (req, res, next) => {
  const { pathname } = req.url;
  if (pathname !== '/login') {
    next();
    return;
  }

  if (req.method === 'GET') {
    res.setHeader('Content-type', 'text/html');
    res.end(createFormPage('login', 'signup'));
    return;
  }

  if (req.method === 'POST') {
    validateLogin(req, res, next);
    return;
  }

  next();
};

module.exports = { loginRouter };
