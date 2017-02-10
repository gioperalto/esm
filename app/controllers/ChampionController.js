// app/controllers/ChampionController.js

// Import modules
var async = require('async');

// Import Champion model
var Champion = require('../models/Champion');

module.exports = {
  getChampions: function(callback) {
    Champion
      .find({})
      .exec(function(err, champions) {
          callback(champions, err);
      });
  },

  getRandomChampion: function(callback) {
    Champion.count(function(err, count) {
      if (err) {
        callback(err);
      }

      var rand = Math.floor(Math.random() * count);
      
      Champion.findOne().skip(rand).exec(function(err, champion) {
        callback(champion, err);
      });
    });
  },

  getRandomChampions: function(callback) {
      // Array to hold async tasks
      var asyncTasks = [];

      // Array to hold champions
      var champions = [];
      var champ_count = Math.ceil(Math.random() * 3) + 2;

      for(var i = 0; i < champ_count; i++) {
        asyncTasks.push(function(callback) {
          module.exports.getRandomChampion(function(champion, err) {
            if(err) {
              callback(err);
            }

            champions.push(champion);
            callback();
          });
        });
      }

      async.parallel(asyncTasks, function(err){
        callback(champions, err);
      });
  }
};