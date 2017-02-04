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
      // Champions to be added to player
      // var champ_count = Math.ceil(Math.random() * 3) + 2;
      // var champs = [];

      // for(var i = 0; i < champ_count; i++) {
      //   ChampionController.getRandomChampion(function(champion, err) {
      //     champs.push(champion);
      //   });
      // }
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

  // TODO: Active roster
};