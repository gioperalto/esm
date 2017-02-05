// config/api-endpoints.js

var ChampionController = require('../app/controllers/ChampionController');
var PlayerController = require('../app/controllers/PlayerController');

module.exports = function(app) {

  // =====================================
  // PLAYERS =============================
  // =====================================

  app.get('/api/players', function(req, res) {
    PlayerController.getPlayers(function(players, err) {
      res.status(200).json(players);
    });
  });

  app.get('/api/player/create', function(req, res) {
    PlayerController.createPlayer(function(player, err) {
      res.status(200).json(player);
    });
  });

  // =====================================
  // CHAMPIONS ===========================
  // =====================================

  app.get('/api/champions', function(req, res) {
    ChampionController.getChampions(function(champions, err) {
      res.status(200).json(champions);
    });
  });

  app.get('/api/champion/random', function(req, res) {
    ChampionController.getRandomChampion(function(champion, err) {
      res.status(200).json(champion);
    });
  });

  app.get('/api/champions/random', function(req, res) {
    ChampionController.getRandomChampions(function(champions, err) {
      res.status(200).json(champions);
    });
  });

  // TODO: Active roster
};