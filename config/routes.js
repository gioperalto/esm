// config/routes.js

var UserController = require('../app/controllers/UserController');
var PlayerController = require('../app/controllers/PlayerController');
var RosterController = require('../app/controllers/RosterController');

module.exports = function(app) {

	// =====================================
  // Home page
  // =====================================
  app.get('/', function(req, res) {
  	res.render('pages', {
  		title: 'Home'
  	});
  });

  // =====================================
  // Signup page
  // =====================================
  app.get('/signup', function(req, res) {
    res.render('pages/signup', {
      title: 'Signup'
    });
  });
  app.post('/signup', function(req, res) {
    UserController.createUser(req,res);
  });

  // =====================================
  // Players
  // =====================================
  app.get('/players', function(req, res) {
    PlayerController.getPlayers(function(players, err) {
      res.render('pages/players', {
        title: 'Players',
        players: players
      });
    });
  });
  app.get('/players/:id', function(req, res) {
    var id = req.params.id;

    PlayerController.getPlayerById(id, function(player, err) {
      res.render('pages/players/view', {
        title: 'View Player',
        player: player
      });
    });
  });

  // =====================================
  // Roster
  // =====================================
  app.get('/roster', function(req, res) {
    RosterController.getActiveRoster(function(roster, err) {
      console.log(roster);
      res.render('pages/roster', {
        title: 'Roster',
        roster: roster
      });
    });
  });

	// =====================================
  // Login page
  // =====================================
  app.get('/login', function(req, res) {
  	res.render('pages/login', {
  		title: 'Login'
  	});
  });

};