'use strict'

let MoodController = require('../../../app/controllers/MoodController');

module.exports = (app) => {

  // =====================================
  // MOODS ===============================
  // =====================================

  app.get('/api/moods', (req, res) => {
    MoodController.getMoods((moods, err) => {
      res.status(200).json(moods);
    });
  }); 

  app.get('/api/moods/random', (req, res) => {
    MoodController.getRandomMood((moods, err) => {
      res.status(200).json(moods);
    });
  }); 

};