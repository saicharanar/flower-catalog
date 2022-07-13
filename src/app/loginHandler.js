const { createFormPage } = require('./createFormPage');

const createSession = (username) => {
  const time = new Date();
  const sessionId = time.getTime();
  return { time, username, sessionId };
};

const validateLogin = (req, res, next) => {
  const { username, password } = req.bodyParams;
  const user = req.users[username];

  if (!user || !username || !password) {
    res.statusCode = 304;
    res.end();
    return;
  }

  if (user.password !== password) {
    res.statusCode = 304;
    res.end();
    return;
  }

  if (username === user.username && password === user.password) {
    const session = createSession(username);
    req.sessions[session.sessionId] = session;
    res.statusCode = 302;
    res.setHeader('Set-Cookie', `sessionId=${session.sessionId}`);
    res.setHeader('Location', '/show-guest-book');
    res.end('New Session created');
    return;
  }

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
