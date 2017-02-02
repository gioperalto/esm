// app/models/Season.js

// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var seasonSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  winner: {
    type: Schema.Types.ObjectId,
    ref: 'Roster'
  },
  start: Date,
  end: Date,
  created_at: Date,
  modified_at: Date
});

// on every save, add the date
seasonSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();
  
  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

var Season = mongoose.model('Season', seasonSchema);

// make this available to our users in our Node applications
module.exports = Season;