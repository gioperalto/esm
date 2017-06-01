'use strict'

let UserController = require('../../../app/controllers/UserController');

module.exports = (app, passport, isLoggedIn) => {

  // =====================================
  // Grow
  // =====================================
  app.get('/grow', isLoggedIn, (req, res) => {
    UserController.getProfileInfo(req.session.passport.user, (user, err) => {
      res.render('pages/shop/grow', {
        title: 'Grow',
        user: user
      });
    });
  });
  app.post('/grow/create', isLoggedIn, (req, res) => {
    UserController.buyNewPlayer(req.session.passport.user, (toastMessage, coin, err) => {
      if(coin)
        req.session.coin = coin;
      console.log(toastMessage);
      res.redirect('/grow');
    });
  });
  app.post('/grow/add', isLoggedIn, (req, res) => {
    UserController.increaseRosterLimit(req.session.passport.user, (toastMessage, coin, err) => {
      if(coin)
        req.session.coin = coin;
      console.log(toastMessage);
      res.redirect('/grow');
    });
  });

};