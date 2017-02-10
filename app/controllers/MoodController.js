// app/controllers/MoodController.js

// Import models
var Mood = require('../models/Mood');

module.exports = {
  getMoods: function(callback) {
    Mood.find()
    .exec(function(err, moods) {
      if(err) {
        callback(err);
      }

      callback(moods, err);
    });
  },

  getRandomMood: function(callback) {
    Mood.count(function(err, count) {
      if (err) {
        callback(err);
      }

      var rand = Math.floor(Math.random() * (count - 1));
      var min = 0, max = 4;
      
      Mood.findOne({
        threshold: {
        "$lte": max,
        "$gte": min
        }
      }).
      sort({ threshold: 1 })
      .skip(rand).exec(function(err, mood) {
        callback(mood, err);
      });
    });
  },

  setMood: function(mood_num, callback) {
    Mood.findOne({
        threshold: {
        "$lte": mood_num
        }
      }).
      sort({ threshold: 1 })
      .exec(function(err, mood) {
        callback(mood, err);
      });
  }
};