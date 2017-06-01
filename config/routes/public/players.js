'use strict'

let PlayerController = require('../../../app/controllers/PlayerController');

module.exports = (app, passport, isLoggedIn) => {

  // =====================================
  // Players
  // =====================================
  app.get('/players', isLoggedIn, function(req, res) {
    PlayerController.getPlayers(function(players, err) {
      res.render('pages/players', {
        title: 'Players',
        players: players
      });
    });
  });
  app.get('/players/:id', isLoggedIn, function(req, res) {
    var id = req.params.id;

    PlayerController.getPlayerById(id, function(player, err) {
      res.render('pages/players/view', {
        title: 'View Player',
        player: player
      });
    });
  });

};