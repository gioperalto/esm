'use strict'

let PlayerController = require('../../../app/controllers/PlayerController');

module.exports = (app) => {

  // =====================================
  // PLAYERS =============================
  // =====================================

  app.get('/api/players', (req, res) => {
    PlayerController.getActivePlayers((players, err) => {
      res.status(200).json(players);
    });
  });

  app.get('/api/players/:id', (req, res) => {
    var id = req.params.id;
    PlayerController.getPlayerById(id, (player, err) => {
      res.status(200).json(player);
    });
  });

  app.get('/api/player/create', (req, res) => {
    PlayerController.createPlayer((player, err) => {
      res.status(200).json(player);
    });
  });

};