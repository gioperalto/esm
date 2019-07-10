// seed.js

// Import functionalities
var mongoose = require('mongoose');
var async = require('async');

// Import models/seed values
var seeds = require('./config/seed-values');
var Rank = require('./app/models/Rank');
var Reward = require('./app/models/Reward');
var Analyst = require('./app/models/Analyst');
var Trainer = require('./app/models/Trainer');
var Champion = require('./app/models/Champion');
var Mood = require('./app/models/Mood');

module.exports = {
  seedRank: function(rank, callback) {
    var r = new Rank(rank);

    r.save(function(err) {
      if(err) {
        callback(err);
      }

      callback(null);
    });
  },

  seedReward: function(reward, callback) {
    var r = new Reward(reward);
  
    r.save(function(err) {
      if(err) {
        callback(err);
      }
      callback(null);
    });
  },

  seedAnalyst: function(analyst, callback) {
    var a = new Analyst(analyst);
  
    a.save(function(err) {
      if(err) {
        callback(err);
      }
      callback(null);
    });
  },

  seedTrainer: function(trainer, callback) {
    var t = new Trainer(trainer);

    t.save(function(err) {
      if(err) {
        callback(err);
      }
      callback(null);
    });
  },

  seedChampion: function(champion, callback) {
    var c = new Champion(champion);

    c.save(function(err) {
      if(err) {
        callback(err);
      }
      callback(null);
    });
  },

  seedMood: function(mood, callback) {
    var m = new Mood(mood);

    m.save(function(err) {
      if(err) {
        callback(err);
      }
      callback(null);
    });
  },

  seedItems: function(seed_arr, model, seedItem, callback) {
    var items = seed_arr;

    model.count({}, function(err, num) {
      if(num == 0) {
        console.log('seeding items into DB...');
        console.log(items);

        async.each(items, seedItem, function(err) {
          if(err) {
            callback(err);
          }
          callback(null);
        });
      } else {
        callback(null);
      }
    });
  },

  seedDB: function() {
    var start = Date.now();

    async.waterfall([
      function(callback) {
        module.exports.seedItems(
          seeds.seedValues.ranks,
          Rank,
          module.exports.seedRank,
          callback
        );
      },
      function(callback) {
        module.exports.seedItems(
          seeds.seedValues.rewards,
          Reward,
          module.exports.seedReward,
          callback
        );
      },
      function(callback) {
        module.exports.seedItems(
          seeds.seedValues.analysts,
          Analyst,
          module.exports.seedAnalyst,
          callback
        );
      },
      function(callback) {
        module.exports.seedItems(
          seeds.seedValues.trainers,
          Trainer,
          module.exports.seedTrainer,
          callback
        );
      },
      function(callback) {
        module.exports.seedItems(
          seeds.seedValues.champions,
          Champion,
          module.exports.seedChampion,
          callback
        );
      },
      function(callback) {
        module.exports.seedItems(
          seeds.seedValues.moods,
          Mood,
          module.exports.seedMood,
          callback
        );
      }
    ], function(err) {
      if(err) {
        console.log(err);
      }
      console.log('\nSync has completed in ' + (Date.now()-start)/1000 + 's.\n');
    });
  }
};