'use strict'

let UserController = require('../../../app/controllers/UserController'),
    RewardController = require('../../../app/controllers/RewardController');

module.exports = (app, passport, isLoggedIn) => {

  // =====================================
  // Login
  // =====================================
  app.post('/login', passport.authenticate('local'), (req, res) => {
      UserController.getProfileInfo(req.session.passport.user, (user, err) => {
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
  (req, res) => {
    console.log(req);
    // Successful authentication
    res.redirect('/profile');
  });

  // =====================================
  // Profile page
  // =====================================
  app.get('/profile', isLoggedIn, (req, res) => {
    UserController.getProfileInfo(req.session.passport.user, (user, err) => {
      RewardController.getAllRewards((rewards, err) => {
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
  // Logout
  // =====================================
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

};