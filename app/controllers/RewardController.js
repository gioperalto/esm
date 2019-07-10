// app/controllers/RewardController.js

// Import models
var Reward = require('../models/Reward');

module.exports = {
  getAllRewards: function(callback) {
    Reward.find()
    .exec(function(err, rewards) {
      if(err)
        callback(err);

      callback(rewards, err);
    });
  }
};