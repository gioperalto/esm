// app/controllers/UserController.js

// Import models
var User = require('../models/User');
var Roster = require('../models/Roster');

// Import controllers
var PlayerController = require('./PlayerController');
var RosterController = require('./RosterController');
var CoinController = require('./CoinController');

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
        PlayerController.createPlayer(function(player) {
          RosterController.generateRosterForPlayer(player, function(roster_item) {
            var newUser = new User();

            // set the user's credentials
            newUser.email    = email;
            newUser.password = newUser.generateHash(password);
            newUser.dob = dob;
            newUser.players.push(roster_item);

            // save the user
            newUser.save(function(err) {
              if (err)
                throw err;

              toastMessage = 'Account successfully created. Try logging in now.';
              console.log(toastMessage);
              res.redirect('/login');
            });
          });
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

  getProfileInfo: function(id, callback) {
    User
    .findById(id)
    .populate('players')
    .exec(function(err, user) {
      if (err)
        throw err;

      Roster.find(user.players)
      .populate('season champion player mood')
      .exec(function(err, roster) {
        var info = {
          players: user.players.length > 0 ? roster : user.players,
          roster_limit: user.roster_limit,
          coin: user.coin
        };

        callback(info, err);
      });
    });
  },

  buyPlayer: function(user_id, player_id, callback) {
    var toastMessage = '';
    User.findById(user_id)
    .exec(function(err, user) {
      if(err)
        callback(err);

      if(user.players.length == user.roster_limit) {
        toastMessage = 'You are at your roster limit. You must sell another '
        + 'player or increase your limit to buy this champion';
        callback(toastMessage);
      } else {
        Roster.findById(player_id)
        .populate('player')
        .exec(function(err, roster_item) {
          var champ_value = roster_item.value;

          if(user.coin < champ_value) {
            toastMessage = 'You cannot afford ' + roster_item.player.username
              + ' for ' + champ_value + ' coin. You only have ' + user.coin + ' coin';
            callback(toastMessage);
          } else {
            user.coin -= champ_value;
            user.coin_spent += champ_value;
            user.players.push(roster_item);
            user.save(function(err) {
              if(err)
                callback(err);

              toastMessage = 'You have purchased ' + roster_item.player.username
                + ' for ' + champ_value + ' coin';
              callback(toastMessage, user.coin, err);
            });
          }
        });
      }
    });
  },

  sellPlayer: function(user_id, player_id, callback) {
    var toastMessage = '';
    User.findById(user_id)
    .exec(function(err, user) {
      if(err)
        callback(err);

      var index = user.players.indexOf(player_id);

      if(index > -1) {
        Roster.findById(player_id)
        .populate('player')
        .exec(function(err, roster_item) {
          if(err)
            callback(err);

          user.coin += roster_item.value;
          user.players.splice(index, 1);
          user.save(function(err) {
            if(err)
              callback(err);

            roster_item.available = true;
            roster_item.save(function(err) {
              if(err)
                callback(err);

              toastMessage = roster_item.player.username + ' was sold for ' 
                + roster_item.value + ' coin';
              callback(toastMessage, user.coin, err);
            });
          });
        });
      } else {
        toastMessage = 'Roster player does not exist';
        callback(toastMessage);
      }
    });
  }
};