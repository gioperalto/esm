// config/admin-routes.js

var UserController = require('../app/controllers/UserController');

module.exports = function(app, passport) {
  // =====================================
  // Login
  // =====================================
  app.post('/login', passport.authenticate('local', {
    successRedirect : '/profile',
    failureRedirect : '/login'
  }));

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
    UserController.getExperience(req.session.passport.user, function(err, exp) {
      res.render('pages/index', {
        title: 'Profile',
        exp: exp
      });
    });
  });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();

  res.redirect('/');
}