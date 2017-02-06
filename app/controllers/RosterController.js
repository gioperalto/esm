// app/controllers/RosterController.js

// Import modules
var async = require('async');

// Import models
var Player = require('../models/Player');
var Roster = require('../models/Roster');

// Import controllers
var SeasonController = require('./SeasonController');
var MoodController = require('./MoodController');

module.exports = {
  generateRoster: function(player, callback) {
    // real_elo, visible_elo
    var real_elo = 750 + Math.round(Math.random() * 500);
    var visible_elo = 1000;

    SeasonController.getCurrentSeason(function(season, err) {
      MoodController.getRandomMood(function(mood, err) {
        var champion = player.champions[Math.floor(Math.random() * player.champions.length)];
        var lane = champion.lanes[Math.floor(Math.random() * champion.lanes.length)];

        var roster = new Roster({
          season: season,
          champion: champion,
          lane: lane.lane,
          tier: lane.tier,
          player: player,
          mood: mood,
          real_elo: real_elo,
          visible_elo: visible_elo,
          value: 0 // TODO: Implement utility method to appraise value
        });

        roster.save(function(err) {
          if(err) {
            callback(err);
          }

          callback(null);
        });
      });
    });
  },

  generate: function(callback) {
    // Array to hold async tasks
    var asyncTasks = [];

    // Array to hold all roster_items
    var roster_items = [];

    Player
    .find()
    .populate('champions')
    .exec(function(err, players) {
      async.each(players, module.exports.generateRoster, function(err) {
        if(err) {
          callback(err);
        }

        callback(null);
      });
    });
  },

  getActiveRoster: function(callback) {
    Roster.find({
      active: true
    })
    .populate('champion player mood')
    .exec(function(err, rosters) {
      callback(rosters, err);
    });
  }
};