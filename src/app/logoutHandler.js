const logoutHandler = (req, res, next) => {
  const { pathname } = req.url;

  if (pathname !== '/logout') {
    next();
    return;
  }

  if (!req.session) {
    res.end('Please login first');
    return;
  }

  const { username, sessionId } = req.session;
  delete req.sessions[sessionId];
  delete req.session;
  res.statusCode = 302;
  res.setHeader('Set-Cookie', `sessionId=${req.cookies.sessionId};Max-Age=0`);
  res.setHeader('Location', '/');
  res.end(`${username} loggedOut`);
  return;
};

module.exports = { logoutHandler };
