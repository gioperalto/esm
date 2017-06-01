'use strict'

let UserController = require('../../../app/controllers/UserController'),
    TrainerController = require('../../../app/controllers/TrainerController'),
    AnalystController = require('../../../app/controllers/AnalystController');

module.exports = (app, passport, isLoggedIn) => {

  // =====================================
  // Hire
  // =====================================
  app.get('/hire', isLoggedIn, (req, res)  => {
    TrainerController.getAllTrainers((trainers)  => {
      AnalystController.getAllAnalysts((analysts)  => {
        res.render('pages/shop/hire', {
          title: 'Hire',
          trainers: trainers,
          analysts: analysts
        });
      });
    });
  });
  app.get('/hire/trainer/:id', isLoggedIn, (req, res)  => {
    var trainer_id = req.params.id
    UserController.getProfileInfo(req.session.passport.user, (user, err)  => {
      TrainerController.getTrainerById(trainer_id, (trainer, err)  => {
        res.render('pages/shop/trainer', {
          title: 'Hire Trainer',
          user: user,
          trainer: trainer
        });
      });
    });
  });
  app.post('/hire/trainer/:id', isLoggedIn, (req, res)  => {
    var roster_item_id = req.body.player_id
    var trainer_id = req.params.id
    UserController.trainPlayer(roster_item_id, trainer_id, (user, err)  => {
      res.redirect('/profile');
    });
  });

};