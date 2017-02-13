// app/controllers/CoinController.js

// Import User model
var User = require('../models/User');

module.exports = {
  spendCoin: function(number, user_id) {
    User.findById(user_id)
    .exec(function(err, user) {
      user.coin -= number;
      user.coin_spent += number;
      user.save();
    });
  },

  purchaseCoin: function(number, user) {
    user.coin += number;
    user.coin_purchased += number;
    user.save();
  },

  awardCoin: function(number, user) {
    user.coin += number;
    user.coin_awarded += number;
    user.save();
  },

  getAllCoin: function(callback) {
    User.aggregate([
    { 
      $group: {
        _id: null,
        coin: { $sum: '$coin'}
      }
    }
    ], function (err, coin) {
      if(err)
        callback(err);

      callback(coin[0].coin, err);
    });
  },

  getAllCoinSpent: function(callback) {
    User.aggregate([
    { 
      $group: {
        _id: null,
        coin_spent: { $sum: '$coin_spent'}
      }
    }
    ], function (err, coin) {
      if(err)
        callback(err);

      callback(coin[0].coin_spent, err);
    });
  },

  getAllCoinPurchased: function(callback) {
    User.aggregate([
    { 
      $group: {
        _id: null,
        coin_purchased: { $sum: '$coin_purchased'}
      }
    }
    ], function (err, coin) {
      if(err)
        callback(err);

      callback(coin[0].coin_purchased, err);
    });
  },

  getAllCoinAwarded: function(callback) {
    User.aggregate([
    { 
      $group: {
        _id: null,
        coin_awarded: { $sum: '$coin_awarded'}
      }
    }
    ], function (err, coin) {
      if(err)
        callback(err);

      callback(coin[0].coin_awarded, err);
    });
  }
};