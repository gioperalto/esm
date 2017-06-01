'use strict'

let PlayerController = require('../../../app/controllers/PlayerController');

module.exports = (app, passport, isLoggedIn) => {

  // =====================================
  // Players
  // =====================================
  app.get('/players', isLoggedIn, (req, res) => {
    PlayerController.getPlayers((players, err) => {
      res.render('pages/players', {
        title: 'Players',
        players: players
      });
    });
  });
  app.get('/players/:id', isLoggedIn, (req, res) => {
    var id = req.params.id;

    PlayerController.getPlayerById(id, (player, err) => {
      res.render('pages/players/view', {
        title: 'View Player',
        player: player
      });
    });
  });

};