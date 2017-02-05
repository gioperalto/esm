// config/routes.js

var UserController = require('../app/controllers/UserController');
var PlayerController = require('../app/controllers/PlayerController');

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
  // Login page
  // =====================================
  app.get('/login', function(req, res) {
  	res.render('pages/login', {
  		title: 'Login'
  	});
  });

};