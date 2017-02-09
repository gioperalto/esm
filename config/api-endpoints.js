// config/api-endpoints.js

var SeasonController = require('../app/controllers/SeasonController');
var ChampionController = require('../app/controllers/ChampionController');
var PlayerController = require('../app/controllers/PlayerController');
var MoodController = require('../app/controllers/MoodController');
var RosterController = require('../app/controllers/RosterController');
var BattleController = require('../app/controllers/BattleController');

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

  app.get('/api/season/create/:number', function(req, res) {
    var number = req.params.number;
    
    SeasonController.createSeason(number, function(season, err) {
      res.status(200).json(season);
    });
  });

  // =====================================
  // MOODS ===============================
  // =====================================

  app.get('/api/moods', function(req, res) {
    MoodController.getMoods(function(moods, err) {
      res.status(200).json(moods);
    });
  }); 

  app.get('/api/moods/random', function(req, res) {
    MoodController.getRandomMood(function(moods, err) {
      res.status(200).json(moods);
    });
  }); 

  // =====================================
  // ROSTERS =============================
  // =====================================

  app.get('/api/rosters/active', function(req, res) {
    RosterController.getActiveRoster(function(roster, err) {
      res.status(200).json(roster);
    });
  });

  app.get('/api/rosters/generate', function(req, res) {
    RosterController.generate(function(roster, err) {
      res.status(200).json(roster);
    });
  });

  // =====================================
  // BATTLES =============================
  // =====================================

  app.get('/api/battles', function(req, res) {
    BattleController.getBattles(function(battles, err) {
      res.status(200).json(battles);
    });
  });

  app.get('/api/battles/battle', function(req, res) {
    RosterController.getActiveRoster(function(roster, err) {
      PlayerController.battle(roster, function(battles, err) {
        res.status(200).json(battles);
      });
    });
  });
};