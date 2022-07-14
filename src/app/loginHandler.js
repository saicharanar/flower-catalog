const { createFormPage } = require('./createFormPage');

const createSession = (username) => {
  const time = new Date();
  const sessionId = time.getTime();
  return { time, username, sessionId };
};

const validateLogin = (req, res, next) => {
  const { username, password } = req.body;
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
    res.cookie(`sessionId=${session.sessionId}`);
    res.set('Location', '/show-guest-book');
    res.end('New Session created');
    return;
  }

};

const serveLoginPage = (req, res) => {
  if (req.session) {
    res.redirect('/show-guest-book');
    res.end();
    return;
  }
  res.set('Content-type', 'text/html');
  res.end(createFormPage('login', 'signup'));
  return;
};


module.exports = { serveLoginPage, validateLogin };
