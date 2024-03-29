// app/controllers/PlayerController.js

// Import modules
var async = require('async');
var unique = require('array-unique');

// Import models
var Player = require('../models/Player');
var Battle = require('../models/Battle');

// Import controllers
var ChampionController = require('./ChampionController');
var RosterController = require('./RosterController');
var MoodController = require('./MoodController');
var RankController = require('./RankController');

module.exports = {
  getPlayers: function(callback) {
    Player
      .find({})
      .exec(function(err, players) {
          callback(players, err);
      });
  },

  getActivePlayers: function(callback) {
    Player
      .find({
        'retired': false
      })
      .exec(function(err, players) {
          callback(players, err);
      });
  },

  getPlayerById: function(id, callback) {
    Player
      .findById(id)
      .populate('champions')
      .exec(function(err, player) {
        callback(player, err);
      });
  },

  createPlayer: function(callback) {
    // TODO: Create utility class for usernames, first names, last names, champions, age, story

    // username
    var uname_part1_arr = [
      'King', 'Ace', 'Shooter', 'Slayer', 'Goon', 'Rabbit', 'Savage', 'Ghost',
      'Merc', 'Reaper', 'Wan', 'Tofu', 'Yeti', 'Pig', 'Dawg', 'Dog', 'Wolf', 'Major',
      'Turtle', 'Monster', 'Uzi', 'Lil', 'Choppa', 'Tree', 'Herb', 'Elite', ''
    ];
    var uname_part2_arr = [
      '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', ' ', 'The', '_', 'Le'
    ];
    var uname_part3_arr = [
      'Trapper', 'Big', 'Gigantic', 'Huge', 'Shrimp', 'Scrawn', 'Brawn', 'Horrid',
      'Soul', 'Shell', 'Bullet', 'Magic', 'Swerve', 'Money', 'Tree', 'Pen', 'Slayer',
      'Warrior', 'Vert', 'Key', 'Solid', 'Metal', 'Gear', 'Ribbit', 'Grim', 'Wall', ''
    ];
    var random_uname = uname_part1_arr[Math.floor(Math.random() * uname_part1_arr.length)]
    + uname_part2_arr[Math.floor(Math.random() * uname_part2_arr.length)]
    + uname_part3_arr[Math.floor(Math.random() * uname_part3_arr.length)];

    // first + last names
    var first_names = [
      'Bill', 'John', 'Jeanie', 'Jennifer', 'Kelly', 'Jen', 'Joe', 'Jimmy', 'Will', 'Wally',
      'Ashley', 'Ashton', 'Ariel', 'Gabriel', 'Manny', 'Dan', 'Crystal', 'Krystal', 'Tammy',
      'Agatha', 'Maria', 'Mariel', 'Allison', 'Shaun', 'Sean', 'Drew', 'Gio', 'Peter', 'Pete',
      'Johnny', 'Steven', 'Stephen', 'Daniel', 'Danny', 'Xavier', 'Kenny', 'Ron', 'Ronald',
      'Kathy', 'Katherine', 'Cassandra', 'Kassandra', 'Christina', 'Cristina', 'Kristina',
      'Carlos', 'Carl', 'Javier', 'Melissa', 'Janet', 'Michael', 'Keith', 'Charles', 'Brian',
      'Amy', 'Jennifer', 'Alex', 'Alexander', 'Matthew', 'Ryan', 'Zachary', 'Lucas', 'Victoria'
    ];
    var last_names = [
      'Carl', 'Isatora', 'Nikimi', 'Shaw', 'Lucas', 'Field', 'Bond', 'Brown', 'Charleston', 'Hob',
      'Wall', 'Lore', 'Lane', 'Rivera', 'Gonzalez', 'Dominguez', 'Hertz', 'Shone', 'Rud', 'James',
      'Gates', 'Johnson', 'Reid', 'Reed', 'Warren', 'Cuban', 'Cobain', 'Marks', 'Anthony', 'Saddler',
      'Horace', 'Barrio', 'Polk', 'Diaz', 'Diez', 'Rafael', 'Shane', 'Rand', 'Austin', 'Cooper', 'Fong',
      'Edwards', 'Rogers', 'Gomez', 'Hurt', 'Watt', 'Ryan', 'Pence', 'Bush', 'Kennedy', 'Washington'
    ];

    ChampionController.getRandomChampions(function(champs, err) {
        if(err) {
          callback(err);
        }

        var player = new Player({
          username: random_uname,
          name: {
            first: first_names[Math.floor(Math.random() * first_names.length)],
            last: last_names[Math.floor(Math.random() * last_names.length)]
          },
          champions: unique(champs),
          age: Math.floor(Math.random() * 13) + 13
        });

        player.save(function(err) {
          if(err) {
            callback(err);
          }

          callback(player);
        });
    });

    
  },

  playMatch: function(roster_item, callback) {
    // TODO: Champ vs Champ odds (refactor into util soon)
    var champ_odds = Math.ceil(Math.random() * 30);
    var opp_champ_odds = Math.ceil(Math.random() * 30);

    // TODO: have function for tier to % conversion
    var tiers = {
      'S': 100,
      'A': 85,
      'B': 70,
      'C': 55,
      'D': 40,
      'E': 25,
      'F': 10
    };
    var tier_value = tiers[roster_item.tier] * 20 / 100;

    // TODO: have function to calculate % based on ELO
    var MAX_ELO_VAL = 35;
    var MIN_ELO_VAL = 0;
    var elo_diff = roster_item.real_elo - roster_item.visible_elo;
    var elo_value = Math.max(Math.min(Math.floor(elo_diff/10),MAX_ELO_VAL),MIN_ELO_VAL);

    // TODO: function to calculate exp val
    var exp_val = Math.min(15, roster_item.player.experience);

    ChampionController.getRandomChampion(function(opponent, err) {
      var opp_tier_value = tiers[opponent.lanes[
        Math.floor(Math.random() * opponent.lanes.length)
      ].tier] * 20 / 100;

      // TODO: Make this cleaner
      var MOOD_BUMP = 1;
      var MOOD_MIN = 0;
      var MOOD_MAX = 7;
      var REAL_ELO_BUMP = 4;
      var VISIBLE_ELO_BUMP = 6;
      var your_odds = champ_odds + tier_value + elo_value + exp_val;
      var opponent_odds = opp_champ_odds + opp_tier_value + 15;
      var victory = your_odds >= opponent_odds;

      var battle = new Battle({
        roster: roster_item,
        opponent: opponent,
        active_mood: roster_item.active_mood,
        score: your_odds,
        opponent_score: opponent_odds,
        victory: victory,
      });

      if(victory) {
        roster_item.wins++;
        roster_item.player.wins++;
        roster_item.real_elo = Math.round(roster_item.real_elo + (REAL_ELO_BUMP * roster_item.mood.win_multiplier));
        roster_item.visible_elo = Math.round(roster_item.visible_elo + (VISIBLE_ELO_BUMP * roster_item.mood.win_multiplier));
        roster_item.active_mood = Math.min(roster_item.active_mood + MOOD_BUMP, MOOD_MAX);
      } else {
        roster_item.losses++;
        roster_item.player.losses++;
        roster_item.active_mood = Math.max(roster_item.active_mood - MOOD_BUMP, MOOD_MIN);
        if(roster_item.visible_elo > 750) {
          roster_item.real_elo = Math.round(roster_item.real_elo - (REAL_ELO_BUMP * roster_item.mood.loss_multiplier));
          roster_item.visible_elo = Math.round(roster_item.visible_elo - (VISIBLE_ELO_BUMP * roster_item.mood.loss_multiplier));
        }
      }

      MoodController.setMood(roster_item.active_mood, function(mood, err) {
        RankController.getRankFromElo(roster_item.visible_elo, function(rank) {
          var MAX_SEASONS = 60;

          roster_item.rank = rank;
          roster_item.value = rank.value + (Math.min(roster_item.player.seasons, MAX_SEASONS) * rank.multiplier);
          roster_item.mood = mood;
          roster_item.save(function(err) {
            if(err)
              callback(err);

            roster_item.player.save(function(err) {
              if(err)
                callback(err);

              battle.save(function(err) {
                if(err)
                  callback(err);

                callback(null);
              });
            });
          });
        });
      });

    });
  },

  battle: function(roster, callback) {
    async.each(roster, module.exports.playMatch, function(err) {
      if(err) {
        callback(err);
      }

      callback(null);
    });
  },


  addSeason(player, callback) {
    player.seasons++;
    player.save(function(err) {
      if(err)
        callback(err);

      callback(null);
    });
  },

  addSeasonToPlayers: function(callback) {
    Player.find()
    .exec(function(err, players) {
      if(err)
        callback(err);

      async.each(players, module.exports.addSeason, function(err) {
        if(err)
          callback(err);

        console.log('Added season to all players...');
        callback(null);
      });
    });
  },
};