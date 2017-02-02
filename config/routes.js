// config/routes.js

var UserController = require('../app/controllers/UserController');

module.exports = function(app) {

	// =====================================
  // Home page
  // =====================================
  app.get('/', function(req, res) {
  	res.render('pages/index', {
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
  // Login page
  // =====================================
  app.get('/login', function(req, res) {
  	res.render('pages/login', {
  		title: 'Login'
  	});
  });

};