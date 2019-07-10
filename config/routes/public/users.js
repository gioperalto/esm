'use strict'

let UserController = require('../../../app/controllers/UserController');


module.exports = (app, passport, isLoggedIn) => {

  // =====================================
  // Home page
  // =====================================
  app.get('/', isLoggedIn, (req, res) => {
    res.render('pages', {
      title: 'Home'
    });
  });

  // =====================================
  // Signup page
  // =====================================
  app.get('/signup', isLoggedIn, (req, res) => {
    res.render('pages/signup', {
      title: 'Signup'
    });
  });
  app.post('/signup', (req, res) => {
    UserController.createUser(req,res);
  });

  

  app.get('/login', isLoggedIn, (req, res) => {
    res.render('pages/login', {
      title: 'Login'
    });
  });

};