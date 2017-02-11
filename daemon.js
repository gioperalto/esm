// daemon.js

// Include modules
var mongoose     = require('mongoose');
var configDB     = require('./config/database');
var cron         = require('node-cron');

// Include controllers
var RosterController = require('./app/controllers/RosterController');
var PlayerController = require('./app/controllers/PlayerController');

// Connect to db
mongoose.connect(configDB.url);

// =====================================
// Battle scheduling
// =====================================
cron.schedule('*/15 8-18 * * 1-6', function(){
  console.log('Beginning all matches...');
  RosterController.getActiveRoster(function(roster, err) {
    if(err)
      console.log(err);

    PlayerController.battle(roster, function(err) {
      if(err)
        console.log(err);
    });
  });
});