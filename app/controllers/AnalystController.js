// app/controllers/AnalystController.js

// Import models
var Analyst = require('../models/Analyst');

module.exports = {
  getAllAnalysts: function(callback) {
    Analyst.find()
    .sort({ cost: -1 })
    .exec(function(err, analysts) {
      if(err)
        callback(err);

      callback(analysts, err);
    });
  }
};