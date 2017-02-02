// config/passport.js

var LocalStrategy   = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../app/models/User');
var UserController = require('../app/controllers/UserController');
var configAuth = require('./auth');

module.exports = function(passport) {

  // =====================================
  // Passport session setup
  // ====================================='
  // required for persistent login sessions

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  // =====================================
  // Local Strategy
  // =====================================
  passport.use('local', new LocalStrategy(
    {
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true
    },
    function(req, email, password, done) {
      User.findOne({ 'email' :  email }, function(err, user) {
          // if there are any errors
          if (err)
            return done(err);

          var toastMessage =  'Local login successful for ' + email;

          // if no user is found
          if (!user) {
            toastMessage = 'No user found.';
            console.log(toastMessage);
            return done(null, false, {toast: toastMessage});
          }
          
          // if user is found but the password is wrong
          if (!user.validPassword(password)) {
            toastMessage = 'Oops! Wrong password.';
            console.log(toastMessage);
            return done(null, false, { toast: toastMessage});
          }
          
          // all is well
          console.log(toastMessage + '');
          return done(null, user);
      });
  }));

  // =====================================
  // Facebook Strategy
  // =====================================
  passport.use(new FacebookStrategy({
    clientID: configAuth.facebookAuth.clientID,
    clientSecret: configAuth.facebookAuth.clientSecret,
    callbackURL: configAuth.facebookAuth.callbackURL,
    profileFields: ['email']
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    UserController.findOrCreateFbUser(profile, function (err, user) {
      return cb(err, user);
    });
  }));

};
