// config/api-endpoints.js

var SeasonController = require('../app/controllers/SeasonController');
var ChampionController = require('../app/controllers/ChampionController');
var PlayerController = require('../app/controllers/PlayerController');

module.exports = function(app) {

  // =====================================
  // PLAYERS =============================
  // =====================================

  app.get('/api/players', function(req, res) {
    PlayerController.getActivePlayers(function(players, err) {
      res.status(200).json(players);
    });
  });

  app.get('/api/players/:id', function(req, res) {
    var id = req.params.id;
    PlayerController.getPlayerById(id, function(player, err) {
      res.status(200).json(player);
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

  // =====================================
  // SEASONS =============================
  // =====================================

  app.get('/api/seasons', function(req, res) {
    SeasonController.getSeasons(function(seasons, err) {
      res.status(200).json(seasons);
    });
  });  

  app.get('/api/seasons/current', function(req, res) {
    SeasonController.getCurrentSeason(function(seasons, err) {
      res.status(200).json(seasons);
    });
  });  

  app.get('/api/season/create/:name', function(req, res) {
    var name = req.params.name;
    
    SeasonController.createSeason(name, function(season, err) {
      res.status(200).json(season);
    });
  });

  // TODO: Active roster
};