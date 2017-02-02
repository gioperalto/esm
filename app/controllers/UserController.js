// app/controllers/UserController.js

// Import User model
var User = require('../models/User');

module.exports = {
  // =====================================
  // Create local user
  // =====================================
  createUser: function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var matchPassword = req.body.matchPassword;
    var dob = new Date(req.body.dob);
    var now = new Date();
    var toastMessage = '';

    User.findOne({ 'email' :  email }, function(err, user) {
      // if there are any errors, return the error
      if (err)
        throw err;

      // check to see if theres already a user with that email
      if(user) {
        toastMessage = 'That email is already taken.';
        console.log(toastMessage);
        res.redirect('/signup');
      } else if(password !== matchPassword) {
        toastMessage = 'Passwords do not match.';
        console.log(toastMessage);
        res.redirect('/signup');
      } else if(dob > now || dob < new Date().setFullYear(now.getYear() - 100)) {
        toastMessage = 'Date of birth is invalid.';
        console.log(toastMessage);
        res.redirect('/signup');
      } else {
        var newUser = new User();

        // set the user's credentials
        newUser.email    = email;
        newUser.password = newUser.generateHash(password);
        newUser.dob = dob;

        // save the user
        newUser.save(function(err) {
          if (err)
            throw err;
          toastMessage = 'Account successfully created. Try logging in now.';
          console.log(toastMessage);
          res.redirect('/login');
        });
      }
    }); 
  },

  // =====================================
  // Find or create Facebook user
  // =====================================
  findOrCreateFbUser: function(profile, callback) {
    User.findOne({ facebookId: profile.id }, function(err, user) {
      if(!user) {
        var newUser = new User();
        newUser.facebookId = profile.id;
        newUser.email = profile._json.email;
        newUser.save(callback);
      } else {
        callback(err,user);
      }
    });
  },

  // =====================================
  // Get DOB
  // =====================================
  getDOB: function(id, callback) {
    User.findById(id, function(err, user) {
      // if there are any errors, return the error
      if (err)
        throw err;

      callback(err,user.dob);
    });
  },

  // =====================================
  // Get Experience
  // =====================================
  getExperience: function(id, callback) {
    User.findById(id, function(err, user) {
      // if there are any errors, return the error
      if (err)
        throw err;

      console.log('Experience: ' + user.experience);
      callback(err,user.experience);
    });
  },

  // =====================================
  // Get Rank
  // =====================================
  getRank: function(id, callback) {
    User.findById(id, function(err, user) {
      // if there are any errors, return the error
      if (err)
        throw err;

      callback(err,user.rank);
    });
  }
};