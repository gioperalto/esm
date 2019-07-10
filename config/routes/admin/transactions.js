'use strict'

let UserController = require('../../../app/controllers/UserController');

module.exports = (app, passport, isLoggedIn) => {

  // =====================================
  // User controls (buy/sell)
  // =====================================
  app.post('/buy/:id', isLoggedIn, (req, res) => {
    var player_id = req.params.id;

    UserController.buyPlayer(req.session.passport.user, player_id, (toastMessage, coin, err) => {
      if(err)
        console.log(err);

      if(coin)
        req.session.coin = coin;

      console.log(toastMessage);
      res.redirect('/profile');
    });
  });
  app.post('/sell/:id', isLoggedIn, (req, res) => {
    var player_id = req.params.id;
    UserController.getUser(req.session.passport.user, (user, err) => {
      if(err)
        console.log(err);

      UserController.sellPlayer(user, player_id, (toastMessage, coin, err) => {
        if(err)
          console.log(err);

        if(coin)
          req.session.coin = coin;

        console.log(toastMessage);
        res.redirect('/profile');
      });
    });
  });
  app.post('/sell/all/:id', isLoggedIn, (req, res) => {
    var player_id = req.params.id;
    UserController.getUser(req.session.passport.user, (user, err) => {
      if(err)
        console.log(err);

      UserController.sellPlayers(user, (coin, err) => {
        if(err)
          console.log(err);

        if(coin)
          req.session.coin = coin;

        res.redirect('/profile');
      });
    });
  });

};