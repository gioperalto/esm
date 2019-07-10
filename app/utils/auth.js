'use strict'

module.exports = {
  isLoggedIn: (req, res, next) => {
    if (req.isAuthenticated()) {
      res.locals.coin = req.session.coin;
      res.locals.login = req.isAuthenticated();
    }

    return next();
  }
};