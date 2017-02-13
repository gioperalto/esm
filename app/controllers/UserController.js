// app/controllers/UserController.js

// Import modules
var async = require('async');

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
    .exec(function(err, user) {
      if (err)
        throw err;

      Roster.find({
        '_id': { 
          $in: user.players
        }
      })
      .populate('season champion player mood rank')
      .exec(function(err, roster) {
        var info = {
          players: user.players.length > 0 ? roster : user.players,
          roster_limit: user.roster_limit,
          coin: user.coin,
          roster_limit: user.roster_limit,
          roster_upgrade_cost: user.roster_upgrade_cost,
          at_roster_limit: user.at_roster_limit
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

              roster_item.available = false;
              roster_item.save(function(err) {
                if(err) {
                  callback(err);
                } else {
                  
                }

                toastMessage = 'You have purchased ' + roster_item.player.username
                  + ' for ' + champ_value + ' coin';
                callback(toastMessage, user.coin, err);
              });
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
      if(err) {
        callback(err);
      } else {
        var index = user.players.indexOf(player_id);

        if(index > -1) {
          Roster.findById(player_id)
          .populate('player')
          .exec(function(err, roster_item) {
            if(err) {
              callback(err);
            } else {
              user.coin += roster_item.value;
              user.players.splice(index, 1);
              user.save(function(err) {
                if(err) {
                  callback(err);
                } else {
                  roster_item.available = true;
                  roster_item.save(function(err) {
                    if(err) {
                      callback(err);
                    } else {
                      toastMessage = roster_item.player.username + ' was sold for ' 
                        + roster_item.value + ' coin';
                      callback(toastMessage, user.coin, err);
                    }
                  });
                }
              });
            }
          });
        } else {
          toastMessage = 'Roster player does not exist';
          callback(toastMessage);
        }
      }
    });
  },

  sellPlayers: function(user, callback) {
    var asyncTasks = [];

    user.players.forEach(function(player) {
      asyncTasks.push(function(callback) {
        module.exports.sellPlayer(user.id, player, function(toastMessage, coin, err) {
          if(err) {
            callback(err);
          } else {
            console.log(toastMessage);
            callback();
          }
        });
      });
    });

    async.parallel(asyncTasks, function(err) {
      if(err)
        callback(err);
      else
        callback(null);
    });
  },

  sellAllPlayers: function(callback) {
    User.find()
    .exec(function(err, users) {
      async.each(users, module.exports.sellPlayers, function(err) {
        if(err)
          callback(err);

        callback(null);
      });
    });
  },

  buyNewPlayer: function(user_id, callback) {
    var cost = 50;
    var toastMessage = '';

    User.findById(user_id)
    .exec(function(err, user) {
      if(user.coin < cost) {
        toastMessage = 'You do not have enough coin to buy a new player.';
        callback(toastMessage);
      } else {
        user.coin -= cost;
        user.coin_spent += cost;
        user.save(function(err) {
          if(err)
            callback(err);
          
          PlayerController.createPlayer(function(player) {
            RosterController.generateRosterForPlayer(player, function(roster_item) {
              module.exports.buyPlayer(
                user_id, 
                roster_item.id, 
                function(toastMessage, coin, err) {
                  callback(toastMessage, coin, err);
              });
            });
          });
        });
      }
    });
  },

  increaseRosterLimit: function(user_id, callback) {
    var toastMessage = '';

    User.findById(user_id)
    .exec(function(err, user) {
      if(err)
        callback(err);

      if(user.coin < user.roster_upgrade_cost) {
        toastMessage = 'You do not have enough coin for this upgrade. '
          + ' It costs ' + user.roster_upgrade_cost + ' coin, and you have '
            + user.coin + ' coin.';
        callback(toastMessage);
      } else {
        user.coin -= user.roster_upgrade_cost;
        user.coin_spent += user.roster_upgrade_cost;
        user.roster_limit++;
        toastMessage = 'Your roster limit is now ' + user.roster_limit;
        user.save(function(err) {
          if(err)
            callback(err);

          callback(toastMessage, user.coin, err);
        });
      }
    });
  }
};