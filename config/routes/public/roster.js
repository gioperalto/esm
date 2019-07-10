'use strict'

let RosterController = require('../../../app/controllers/RosterController'),
    BattleController = require('../../../app/controllers/BattleController');


module.exports = (app, passport, isLoggedIn) => {

  // =====================================
  // Roster
  // =====================================
  app.get('/roster', isLoggedIn, (req, res) => {
    RosterController.getActiveRoster((roster, err) => {
      res.render('pages/roster', {
        title: 'Roster',
        roster: roster
      });
    });
  });
  app.get('/roster/history/:id', isLoggedIn, (req, res) => {
    var id = req.params.id;
    
    BattleController.getBattlesByRoster(id, (battles, err) => {
      res.render('pages/roster/history', {
        title: 'Match History',
        battles: battles
      });
    });
  });

};