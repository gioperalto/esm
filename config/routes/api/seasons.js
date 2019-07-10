'use strict'

let SeasonController = require('../../../app/controllers/SeasonController');

module.exports = (app) => {

  // =====================================
  // SEASONS =============================
  // =====================================

  app.get('/api/seasons', (req, res) => {
    SeasonController.getSeasons((seasons, err) => {
      res.status(200).json(seasons);
    });
  });  

  app.get('/api/seasons/current', (req, res) => {
    SeasonController.getCurrentSeason((seasons, err) => {
      res.status(200).json(seasons);
    });
  });  

  app.get('/api/season/create/:number', (req, res) => {
    var number = req.params.number;
    
    SeasonController.createSeason(number, (season, err) => {
      res.status(200).json(season);
    });
  });

};