const { createFormPage } = require('./createFormPage');
const { createTag } = require('tag');

const createSession = (username) => {
  const time = new Date();
  const sessionId = time.getTime();
  return { time, username, sessionId };
};

const createUser = (req, res, next, username) => {
  const session = createSession(username);
  req.sessions[session.sessionId] = session;
  res.statusCode = 302;
  res.setHeader('Set-Cookie', `sessionId=${session.sessionId}`);
  res.setHeader('Location', '/login');
  res.end();
  return;
};

const serveSignUpPage = (req, res, next) => {
  res.setHeader('Content-type', 'text/html');
  res.end(createFormPage('signup', 'login'));
  return;
};

const warnInvalidUserName = (req, res, next) => {
  const invalidMessage = 'Not a valid username';
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

  const { username } = req.bodyParams;
  if (req.method === 'POST' && username) {
    createUser(req, res, next, username);
    return;
  } else {
    warnInvalidUserName(req, res, next);
    return;
  }

  next();
};

module.exports = { signupRouter };
