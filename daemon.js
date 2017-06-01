'use strict'
// daemon.js

// Include modules
let mongoose     = require('mongoose'),
    configDB     = require('./config/database'),
    cron         = require('node-cron');

// Include controllers
let RosterController = require('./app/controllers/RosterController'),
    PlayerController = require('./app/controllers/PlayerController'),
    SeasonController = require('./app/controllers/SeasonController');

// Connect to db
mongoose.Promise = require('bluebird');
mongoose.connect(configDB.url);

// =====================================
// Battle scheduling
// =====================================
cron.schedule('*/15 8-18 * * *', ()=> {
  console.log('Beginning all matches...');
  RosterController.getActiveRoster((roster, err) => {
    if(err)
      throw err;

    PlayerController.battle(roster, (err) => {
      if(err)
        throw err;
    });
  });
});

// =====================================
// Moving to a new season
// =====================================
cron.schedule('0 0 * * Mon', () => {
  console.log('Moving to new season...');

  SeasonController.getCurrentSeason((season, err) => {
    if(err)
      console.log(err);

    SeasonController.nextSeason(season, (new_season, err) => {
      if(err)
        console.log(err);

      console.log('Season ' + new_season.number + ' created...');
      RosterController.deactivateRoster((err) => {
        if(err)
          console.log(err);

        console.log('Deactivated all players from season ' + season.number);
        RosterController.generate((err) => {
          if(err)
            console.log(err);

          console.log('Generated roster for all players in new season...');
        });
      })
    });
  });
});