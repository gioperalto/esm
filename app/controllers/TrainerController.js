// app/controllers/TrainerController.js

// Import models
var Trainer = require('../models/Trainer');

module.exports = {
  getAllTrainers: function(callback) {
    Trainer.find()
    .sort({ cost: -1 })
    .exec(function(err, trainers) {
      if(err)
        callback(err);

      callback(trainers, err);
    });
  },

  getTrainerById: function(id, callback) {
    Trainer.findById(id)
    .exec(function(err, trainer) {
      if(err)
        callback(err);

      callback(trainer, err);
    });
  }
};