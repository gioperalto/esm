'use strict'

let RosterController = require('../../../app/controllers/RosterController');

module.exports = (app) => {

  // =====================================
  // ROSTERS =============================
  // =====================================

  app.get('/api/rosters/active', (req, res) => {
    RosterController.getActiveRoster((roster, err) => {
      res.status(200).json(roster);
    });
  });

  app.get('/api/rosters/generate', (req, res) => {
    RosterController.generate((roster, err) => {
      res.status(200).json(roster);
    });
  });

};