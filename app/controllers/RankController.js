// app/controllers/RankController.js

// Import models
var Rank = require('../models/Rank');

module.exports = {
  getAllRanks: function(callback) {
    Rank.find()
    .sort({ cost: -1 })
    .exec(function(err, ranks) {
      if(err)
        callback(err);

      callback(ranks, err);
    });
  },

  getRankFromElo: function(elo, callback) {
    Rank.findOne({
      threshold: {
        "$lte": elo
      }
    })
    .sort({ start: -1 })
    .exec(function(err, rank) {
      if(err)
        callback(err);

      callback(rank);
    });
  }
};