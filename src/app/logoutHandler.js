const logoutHandler = (req, res, next) => {
  if (!req.session) {
    res.sendStatus(401);
    res.end();
    return;
  }

  const { username, sessionId } = req.session;
  delete req.sessions[sessionId];
  delete req.session;
  res.set('Set-Cookie', `sessionId=${req.cookies.sessionId};Max-Age=0`);
  res.redirect('/homePage.html');
  return;
};

module.exports = { logoutHandler };
