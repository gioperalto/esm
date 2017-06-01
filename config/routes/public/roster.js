'use strict'

let RosterController = require('../../../app/controllers/RosterController'),
    BattleController = require('../../../app/controllers/BattleController');


module.exports = (app, passport, isLoggedIn) => {

  // =====================================
  // Roster
  // =====================================
  app.get('/roster', isLoggedIn, function(req, res) {
    RosterController.getActiveRoster(function(roster, err) {
      res.render('pages/roster', {
        title: 'Roster',
        roster: roster
      });
    });
  });
  app.get('/roster/history/:id', isLoggedIn, function(req, res) {
    var id = req.params.id;
    
    BattleController.getBattlesByRoster(id, function(battles, err) {
      res.render('pages/roster/history', {
        title: 'Match History',
        battles: battles
      });
    });
  });

};