// app/controllers/RosterController.js

// Import modules
var async = require('async');

// Import models
var Player = require('../models/Player');
var Roster = require('../models/Roster');

// Import controllers
var SeasonController = require('./SeasonController');
var MoodController = require('./MoodController');
var UserController = require('./UserController');
var RankController = require('./RankController');

module.exports = {
  generateRosterForPlayer: function(player, callback) {
    // real_elo, visible_elo
    var real_elo = 725 + Math.round(Math.random() * 500);
    var visible_elo = 849;

    SeasonController.getCurrentSeason(function(season, err) {
      MoodController.getRandomMood(function(mood, err) {
        RankController.getRankFromElo(visible_elo, function(rank) {
          var MAX_SEASONS = 60;
          var champion = player.champions[Math.floor(Math.random() * player.champions.length)];
          var lane = champion.lanes[Math.floor(Math.random() * champion.lanes.length)];

          var roster = new Roster({
            season: season,
            champion: champion,
            lane: lane.lane,
            tier: lane.tier,
            player: player,
            active_mood: mood.threshold,
            mood: mood,
            rank: rank,
            available: false,
            real_elo: real_elo,
            visible_elo: visible_elo,
            value: Math.min(player.seasons, MAX_SEASONS) * rank.multiplier
          });

          roster.save(function(err) {
            if(err) {
              callback(err);
            } else {
              callback(roster);
            }
          });
        });
      });
    });
  },

  generateRoster: function(player, callback) {
    // real_elo, visible_elo
    var real_elo = 725 + Math.round(Math.random() * 500);
    var visible_elo = 849;

    SeasonController.getCurrentSeason(function(season, err) {
      MoodController.getRandomMood(function(mood, err) {
        RankController.getRankFromElo(visible_elo, function(rank) {
          var MAX_SEASONS = 60;
          var champion = player.champions[Math.floor(Math.random() * player.champions.length)];
          var lane = champion.lanes[Math.floor(Math.random() * champion.lanes.length)];

          var roster = new Roster({
            season: season,
            champion: champion,
            lane: lane.lane,
            tier: lane.tier,
            player: player,
            active_mood: mood.threshold,
            mood: mood,
            rank: rank,
            real_elo: real_elo,
            visible_elo: visible_elo,
            value: Math.min(player.seasons, MAX_SEASONS) * rank.multiplier
          });

          roster.save(function(err) {
            if(err) {
              callback(err);
            } else {
              callback(null);
            }
          });
        });
      });
    });
  },

  generate: function(callback) {
    Player
    .find()
    .populate('champions')
    .exec(function(err, players) {
      async.each(players, module.exports.generateRoster, function(err) {
        if(err) {
          callback(err);
        } else {
          callback(null);
        }
      });
    });
  },

  deactivateRosterPlayer: function(player, callback) {
    player.active = false;
    player.save(function(err) {
      if(err) {
        callback(err);
      } else {
        callback(null);
      }
    });
  },

  deactivateRoster: function(callback) {
    UserController.sellAllPlayers(function(err) {
      if(err) {
        callback(err);
      } else {
        module.exports.getActiveRoster(function(roster, err) {
          if(err) {
            callback(err);
          } else {
            async.each(roster, module.exports.deactivateRosterPlayer, function(err) {
              if(err) {
                callback(err);
              } else {
                callback(null);
              }
            });
          }
        });
      }
    });
  },

  getActiveRoster: function(callback) {
    Roster.find({
      active: true
    })
    .populate('champion player mood rank')
    .exec(function(err, roster) {
      if(err) {
        callback(err);
      } else {
        callback(roster, err);
      }      
    });
  },

  getRosterById: function(id, callback) {
    Roster.findById(id)
    .populate('champion player mood rank')
    .exec(function(err, roster_item) {
      if(err) {
        callback(err);
      } else {
        callback(roster_item, err);
      }
    });
  }
};