// config/routes.js

var UserController = require('../app/controllers/UserController');
var PlayerController = require('../app/controllers/PlayerController');
var RosterController = require('../app/controllers/RosterController');
var BattleController = require('../app/controllers/BattleController');

module.exports = function(app, passport) {

	// =====================================
  // Home page
  // =====================================
  app.get('/', isLoggedIn, function(req, res) {
  	res.render('pages', {
  		title: 'Home'
  	});
  });

  // =====================================
  // Signup page
  // =====================================
  app.get('/signup', isLoggedIn, function(req, res) {
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

  // =====================================
  // Roster
  // =====================================
  app.get('/roster', isLoggedIn, function(req, res) {
    RosterController.getActiveRoster(function(roster, err) {
      res.render('pages/roster', {
        title: 'Roster',
        roster: roster
      });
    });
  });
  app.get('/roster/history/:id', isLoggedIn, function(req, res) {
    var id = req.params.id;
    
    BattleController.getBattlesByRoster(id, function(battles, err) {
      res.render('pages/roster/history', {
        title: 'Match History',
        battles: battles
      });
    });
  });

  app.get('/login', isLoggedIn, function(req, res) {
  	res.render('pages/login', {
  		title: 'Login'
  	});
  });

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.coin = req.session.coin;
    res.locals.login = req.isAuthenticated();
  }

  return next();
}