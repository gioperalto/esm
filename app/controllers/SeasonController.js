// app/controllers/SeasonController.js

// Import models
var Season = require('../models/Season');

module.exports = {
  getSeasons: function(callback) {
    Season.find()
    .exec(function(err, seasons) {
      if(err) {
        callback(err);
      }

      callback(seasons, err);
    });
  },

  getCurrentSeason: function(callback) {
    var now = new Date();

    Season.findOne({
      start: {
        "$lte": now
      },
      end: {
        "$gte": now
      }
    })
    .exec(function(err, season) {
      if(err) {
        callback(err);
      }

      callback(season, err);
    });
  },

  createSeason: function(number, callback) {
    var now = new Date();
    var nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    var season = new Season({
      number: number,
      start: now,
      end: nextWeek
    });

    season.save(function(err, season) {
      if(err) {
        callback(err)
      }

      callback(season, err);
    });
  }
};