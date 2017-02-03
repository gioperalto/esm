// seed.js

// Import functionalities
var mongoose = require('mongoose');
var async = require('async');

// Import models/seed values
var seeds = require('./config/seed-values');
var Analyst = require('./app/models/Analyst');
var Trainer = require('./app/models/Trainer');
var Champion = require('./app/models/Champion');
var Mood = require('./app/models/Mood');

module.exports = {
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
        seedItems(
          seeds.seedValues.analysts,
          Analyst,
          seedAnalyst,
          callback
        );
      },
      function(callback) {
        seedItems(
          seeds.seedValues.trainers,
          Trainer,
          seedTrainer,
          callback
        );
      },
      function(callback) {
        seedItems(
          seeds.seedValues.champions,
          Champion,
          seedChampion,
          callback
        );
      },
      function(callback) {
        seedItems(
          seeds.seedValues.moods,
          Mood,
          seedMood,
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