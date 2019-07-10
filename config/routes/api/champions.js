'use strict'

let ChampionController = require('../../../app/controllers/ChampionController');

module.exports = (app) => {

  // =====================================
  // CHAMPIONS ===========================
  // =====================================

  app.get('/api/champions', (req, res) => {
    ChampionController.getChampions((champions, err) => {
      res.status(200).json(champions);
    });
  });

  app.get('/api/champion/random', (req, res) => {
    ChampionController.getRandomChampion((champion, err) => {
      res.status(200).json(champion);
    });
  });

  app.get('/api/champions/random', (req, res) => {
    ChampionController.getRandomChampions((champions, err) => {
      res.status(200).json(champions);
    });
  });

};