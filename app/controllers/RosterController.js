// app/controllers/RosterController.js

// Import modules
var async = require('async');

// Import models
var Player = require('../models/Player');
var Roster = require('../models/Roster');

module.exports = {
  generate: function(player, callback) {

  },

  generateAll: function(callback) {
    // Array to hold async tasks
    var asyncTasks = [];

    Player
    .find()
    .exec(function(err, players) {
        for(var i = 0; i < players.length; i++) {
          var player = players[i];

          asyncTasks.push(function(callback) {

          });
        }
    });
  }
};