// app/models/Mood.js

// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var moodSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  threshold: {
    type: Number,
    required: true
  },
  win_multiplier: {
    type: Number,
    required: true
  },
  loss_multiplier: {
    type: Number,
    required: true
  },
  created_at: Date,
  modified_at: Date
});

// on every save, add the date
moodSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();
  
  // change the modified_at field to current date
  this.modified_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

var Mood = mongoose.model('Mood', moodSchema);

// make this available to our users in our Node applications
module.exports = Mood;