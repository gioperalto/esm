// app/controllers/ChampionController.js

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
  }
};