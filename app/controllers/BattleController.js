// app/controllers/BattleController.js

// Import models
var Battle = require('../models/Battle');

module.exports = {
  getBattles: function(callback) {
    Battle.find()
    .exec(function(err, battles) {
      if(err) {
        callback(err);
      }

      callback(battles);
    });
  },

  getBattlesByRoster: function(id, callback) {
    Battle.find({
      roster: id
    })
    .populate('roster opponent')
    .exec(function(err, battles) {
      if(err) {
        callback(err);
      }

      callback(battles, err);
    });
  },

  getBattleCountByRoster: function(id, callback) {
    Battle.find({
      roster: id
    }).count(function(err, count) {
      if(err) {
        callback(err);
      }

      callback(count, err);
    });
  }
};