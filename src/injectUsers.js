const injectUsers = (users = {}) => {
  return (req, res, next) => {
    req.users = users;
    next();
  }
};

module.exports = { injectUsers };
