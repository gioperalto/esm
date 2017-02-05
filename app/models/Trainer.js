// app/models/Trainer.js

// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var trainerSchema = new Schema({
  name: {
    first: {
      type: String,
      required: true
    },
    last: {
      type: String,
      required: true
    }
  },
  cost: {
    type: Number,
    required: true
  },
  depth: {
    type: Number,
    required: true
  },
  chance: {
    type: Number,
    required: true
  },
  story: String,
  created_at: Date,
  modified_at: Date
});

// on every save, add the date
trainerSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();
  
  // change the modified_at field to current date
  this.modified_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

var Trainer = mongoose.model('Trainer', trainerSchema);

// make this available to our users in our Node applications
module.exports = Trainer;