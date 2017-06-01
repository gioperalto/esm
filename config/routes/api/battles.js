'use strict'

let PlayerController = require('../../../app/controllers/PlayerController'),
    RosterController = require('../../../app/controllers/RosterController'),
    BattleController = require('../../../app/controllers/BattleController');

module.exports = (app) => {

  // =====================================
  // BATTLES =============================
  // =====================================

  app.get('/api/battles', (req, res) => {
    BattleController.getBattles((battles, err) => {
      res.status(200).json(battles);
    });
  });

  app.get('/api/battles/battle', (req, res) => {
    RosterController.getActiveRoster((roster, err) => {
      PlayerController.battle(roster, (battles, err) => {
        res.status(200).json(battles);
      });
    });
  });

};