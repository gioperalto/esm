// daemon.js

// Include modules
var mongoose     = require('mongoose');
var configDB     = require('./config/database');
var cron         = require('node-cron');

// Include controllers
var RosterController = require('./app/controllers/RosterController');
var PlayerController = require('./app/controllers/PlayerController');
var SeasonController = require('./app/controllers/SeasonController');

// Connect to db
mongoose.connect(configDB.url);

// =====================================
// Battle scheduling
// =====================================
cron.schedule('*/15 8-18 * * *', function(){
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

cron.schedule('59 23 * * Sun', function() {
  console.log('Moving to new season...');

  SeasonController.getCurrentSeason(function(season, err) {
    if(err)
      console.log(err);

    SeasonController.nextSeason(season, function(new_season, err) {
      if(err)
        console.log(err);

      console.log('Season ' + new_season.number + ' created...');
      RosterController.deactivateRoster(function(err) {
        if(err)
          console.log(err);

        console.log('Deactivated all players from season ' + season.number);
        RosterController.generate(function(err) {
          if(err)
            console.log(err);

          console.log('Generated roster for all players in new season...');
        });
      })
    });
  });
});