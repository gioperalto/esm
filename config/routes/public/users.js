'use strict'

let UserController = require('../../../app/controllers/UserController');


module.exports = (app, passport, isLoggedIn) => {

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

  

  app.get('/login', isLoggedIn, function(req, res) {
    res.render('pages/login', {
      title: 'Login'
    });
  });

};