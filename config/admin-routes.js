// config/admin-routes.js

var UserController = require('../app/controllers/UserController');
var PlayerController = require('../app/controllers/PlayerController');
var RosterController = require('../app/controllers/RosterController');
var BattleController = require('../app/controllers/BattleController');
var RewardController = require('../app/controllers/RewardController');
var TrainerController = require('../app/controllers/TrainerController');
var AnalystController = require('../app/controllers/AnalystController');

module.exports = function(app, passport) {
  // =====================================
  // Login
  // =====================================
  app.post('/login', passport.authenticate('local'), function(req, res) {
      UserController.getProfileInfo(req.session.passport.user, function(user, err) {
        req.session.coin = user.coin;
        res.redirect('/profile');
      });
  });

  // =====================================
  // Facebook Login
  // =====================================
  app.get('/auth/facebook', passport.authenticate('facebook', { 
    authType: 'rerequest',
    scope: ['email','public_profile']
  }));
  app.get('/auth/facebook/callback', passport.authenticate('facebook', { 
    failureRedirect: '/login' 
  }),
  function(req, res) {
    console.log(req);
    // Successful authentication
    res.redirect('/profile');
  });

  // =====================================
  // Profile page
  // =====================================
  app.get('/profile', isLoggedIn, function(req, res) {
    UserController.getProfileInfo(req.session.passport.user, function(user, err) {
      RewardController.getAllRewards(function(rewards, err) {
        req.session.coin = user.coin;
        res.render('pages/users/profile', {
          title: 'Profile',
          rewards: rewards,
          user: user
        });
      });
    });
  });

  // =====================================
  // User controls (buy/sell)
  // =====================================
  app.post('/buy/:id', isLoggedIn, function(req, res) {
    var player_id = req.params.id;

    UserController.buyPlayer(req.session.passport.user, player_id, function(toastMessage, coin, err) {
      if(err)
        console.log(err);

      if(coin)
        req.session.coin = coin;

      console.log(toastMessage);
      res.redirect('/profile');
    });
  });
  app.post('/sell/:id', isLoggedIn, function(req, res) {
    var player_id = req.params.id;

    UserController.sellPlayer(req.session.passport.user, player_id, function(toastMessage, coin, err) {
      if(err)
        console.log(err);

      if(coin)
        req.session.coin = coin;

      console.log(toastMessage);
      res.redirect('/profile');
    });
  });

  // =====================================
  // Hire
  // =====================================
  app.get('/hire', isLoggedIn, function(req, res) {
    TrainerController.getAllTrainers(function(trainers) {
      AnalystController.getAllAnalysts(function(analysts) {
        res.render('pages/shop/hire', {
          title: 'Hire',
          trainers: trainers,
          analysts: analysts
        });
      });
    });
  });
  app.get('/hire/trainer', isLoggedIn, function(req, res) {
    res.render('pages/shop/hire', {
      title: 'Hire Trainer',
    });
  });

  // =====================================
  // Grow
  // =====================================
  app.get('/grow', isLoggedIn, function(req, res) {
    UserController.getProfileInfo(req.session.passport.user, function(user, err) {
      res.render('pages/shop/grow', {
        title: 'Grow',
        user: user
      });
    });
  });
  app.post('/grow/create', isLoggedIn, function(req, res) {
    UserController.buyNewPlayer(req.session.passport.user, function(toastMessage, coin, err) {
      if(coin)
        req.session.coin = coin;
      console.log(toastMessage);
      res.redirect('/grow');
    });
  });
  app.post('/grow/add', isLoggedIn, function(req, res) {
    UserController.increaseRosterLimit(req.session.passport.user, function(toastMessage, coin, err) {
      if(coin)
        req.session.coin = coin;
      console.log(toastMessage);
      res.redirect('/grow');
    });
  });

  // =====================================
  // Logout
  // =====================================
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
};



// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.coin = req.session.coin;
    res.locals.login = req.isAuthenticated();
    return next();
  }

  res.redirect('/');
}